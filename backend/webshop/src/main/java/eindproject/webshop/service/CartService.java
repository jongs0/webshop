package eindproject.webshop.service;

import eindproject.webshop.dto.cart.CartDTO;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.model.cart.Cart;
import eindproject.webshop.model.cart.CartItem;
import eindproject.webshop.model.product.Product;
import eindproject.webshop.repository.AppUserRepository;
import eindproject.webshop.repository.CartRepository;
import eindproject.webshop.repository.ProductRepository;
import eindproject.webshop.service.product.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CartService {

    private final CartRepository cartRepository;
    private final AppUserRepository appUserRepository;
    private final ProductRepository productRepository;

    @Autowired
    private final ProductService productService;

    public CartService(CartRepository cartRepository,
                       AppUserRepository appUserRepository,
                       ProductRepository productRepository,
                       ProductService productService) {
        this.cartRepository = cartRepository;
        this.appUserRepository = appUserRepository;
        this.productRepository = productRepository;
        this.productService = productService;
    }

    public CartDTO getCartByUserId(Long userId) {
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = loadOrCreateCart(user);

        return CartDTO.fromEntity(cart, productService);
    }

    public CartDTO addToCart(Long userId, Long productId) {

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = loadOrCreateCart(user);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingProduct = cart.getCartItems().stream()
                .filter(cartItem -> cartItem.getProductId().equals(productId))
                .findFirst();

        int quantity = 1;

        if (existingProduct.isPresent()) {
            existingProduct.get().setQuantity(existingProduct.get().getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProductId(productId);
            newItem.setQuantity(1);
            cart.addCartItem(newItem);
        }

        cartRepository.save(cart);

        return CartDTO.fromEntity(cart, productService);
    }

    public CartDTO increaseItem(Long userId, Long productId) {

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = loadOrCreateCart(user);

        CartItem item = cart.getCartItems().stream()
                .filter(cartItem -> cartItem.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (item.getQuantity() >= product.getStock()) {
            throw new RuntimeException("Not enough stock");
        }

        item.setQuantity(item.getQuantity() + 1);

        cartRepository.save(cart);
        return CartDTO.fromEntity(cart, productService);
    }

    public CartDTO decreaseItem(Long userId, Long productId) {

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = loadOrCreateCart(user);

        CartItem item = cart.getCartItems().stream()
                .filter(cartItem -> cartItem.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (item.getQuantity() <= 1) {
            cart.removeCartItem(item);
        } else {
            item.setQuantity(item.getQuantity() - 1);
        }

        cartRepository.save(cart);
        return CartDTO.fromEntity(cart, productService);
    }

    public CartDTO clearCart(Long userId) {

        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = loadOrCreateCart(user);

        cart.getCartItems().clear();
        cartRepository.save(cart);

        return CartDTO.fromEntity(cart, productService);
    }

    private Cart loadOrCreateCart(AppUser user) {
        if (user.getCart() != null) {
            return user.getCart();
        }

        Cart newCart = new Cart();
        newCart.setAppUser(user);

        user.setCart(newCart);
        return cartRepository.save(newCart);
    }
}
