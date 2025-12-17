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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final AppUserRepository appUserRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                        AppUserRepository appUserRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.appUserRepository = appUserRepository;
        this.productRepository = productRepository;
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
