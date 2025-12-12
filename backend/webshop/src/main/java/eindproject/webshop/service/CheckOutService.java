package eindproject.webshop.service;

import eindproject.webshop.dto.order.OrderDTO;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.model.appuser.Adress;
import eindproject.webshop.model.cart.Cart;
import eindproject.webshop.model.cart.CartItem;
import eindproject.webshop.model.enums.PaymentMethod;
import eindproject.webshop.model.order.Order;
import eindproject.webshop.model.order.OrderItem;
import eindproject.webshop.model.product.Product;
import eindproject.webshop.repository.AppUserRepository;
import eindproject.webshop.repository.CartRepository;
import eindproject.webshop.repository.OrderRepository;
import eindproject.webshop.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CheckOutService {

    private final AppUserRepository appUserRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public CheckOutService(AppUserRepository appUserRepository,
                           CartRepository cartRepository,
                           OrderRepository orderRepository,
                           ProductRepository productRepository) {

        this.appUserRepository = appUserRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public OrderDTO checkout(Long appUserId, PaymentMethod paymentMethod) {

        AppUser appUser = appUserRepository.findById(appUserId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + appUserId));

        Cart cart = appUser.getCart();
        if (cart == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty, can't checkout");
        }

        Adress address = appUser.getAdress();
        if (address == null) {
            throw new RuntimeException("User must have an address before checking out");
        } // ookal heeft de user een account nodig met adres om te bestellen,
        // deze is misschien handig bij het testen vd endpoints

        Order order = new Order();
        order.setAppUser(appUser);
        order.setPaymentMethod(paymentMethod);
        order.setAddress(address);

        double total = 0.0;

        for (CartItem cartItem : cart.getCartItems()) {

            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException("Product not found: " + cartItem.getProductId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductId(product.getId());
            orderItem.setProductName(product.getName());
            orderItem.setQuantity(cartItem.getQuantity());

            orderItem.calculateLineTotal(product.getPrice());
            total += orderItem.getLineTotal();



            order.addOrderItem(orderItem);
        }

        order.setTotalSum(total);

        Order savedOrder = orderRepository.save(order);

        cart.getCartItems().clear();
        cartRepository.save(cart);

        return OrderDTO.fromEntity(savedOrder);
    }
}
