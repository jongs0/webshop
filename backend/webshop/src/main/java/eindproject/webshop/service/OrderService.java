package eindproject.webshop.service;

import eindproject.webshop.dto.order.OrderCreateDTO;
import eindproject.webshop.dto.order.OrderDTO;
import eindproject.webshop.dto.order.OrderItemDTO;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.model.appuser.Adress;
import eindproject.webshop.model.order.Order;
import eindproject.webshop.model.order.OrderItem;
import eindproject.webshop.model.product.Product;
import eindproject.webshop.repository.AppUserRepository;
import eindproject.webshop.repository.OrderRepository;
import eindproject.webshop.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final AppUserRepository appUserRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        AppUserRepository appUserRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.appUserRepository = appUserRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public OrderDTO createOrder(OrderCreateDTO createDTO) {

        AppUser user = appUserRepository.findById(createDTO.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setAppUser(user);
        order.setPaymentMethod(createDTO.paymentMethod());

        Adress addressToUse = user.getAdress();
        if (addressToUse == null) {
            throw new RuntimeException("User does not have an adress");
        }
        order.setAddress(addressToUse);

        double total = 0.0;

        for (OrderItemDTO itemDTO : createDTO.items()) {

            Product product = productRepository.findById(itemDTO.productId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setQuantity(itemDTO.quantity());

            double lineTotal = product.getPrice() * itemDTO.quantity();
            item.setLineTotal(lineTotal);

            order.addOrderItem(item);

            total += lineTotal;
        }

        order.setTotalSum(total);

        Order saved = orderRepository.save(order);

        return OrderDTO.fromEntity(saved);
    }

    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return OrderDTO.fromEntity(order);
    }

    public List<OrderDTO> getOrdersForUser(Long userId) {
        return orderRepository.findByAppUserId(userId)
                .stream()
                .map(OrderDTO::fromEntity)
                .toList();
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrderDTO::fromEntity)
                .toList();
    }
}
