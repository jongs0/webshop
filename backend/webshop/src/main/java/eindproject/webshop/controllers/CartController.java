package eindproject.webshop.controllers;

import eindproject.webshop.dto.order.OrderDTO;
import eindproject.webshop.model.enums.PaymentMethod;
import eindproject.webshop.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eindproject.webshop.dto.cart.CartDTO;
import eindproject.webshop.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final CheckOutService checkOutService;

    @Autowired
    public CartController(CartService cartService, CheckOutService checkOutService) {
        this.cartService = cartService;
        this.checkOutService = checkOutService;
    }

    @PostMapping("/{appUserId}/checkout")
    public ResponseEntity<OrderDTO> checkout(
            @PathVariable Long appUserId,
            @RequestParam PaymentMethod paymentMethod
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(checkOutService.checkout(appUserId, paymentMethod));
    }

    @GetMapping("/{appUserId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Long appUserId) {
        return ResponseEntity.ok().body(cartService.getCartByUserId(appUserId));
    }

    @PostMapping("/{appUserId}/add/{productId}")
    public ResponseEntity<CartDTO> addToCart(
            @PathVariable Long appUserId,
            @PathVariable Long productId
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addToCart(appUserId, productId));
    }

    @DeleteMapping("/{appUserId}/remove/{productId}")
    public ResponseEntity<CartDTO> removeFromCart(
            @PathVariable Long appUserId,
            @PathVariable Long productId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.removeFromCart(appUserId, productId));
    }

    @PostMapping("/{userId}/increase/{productId}")
    public ResponseEntity<CartDTO> increaseItem(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(cartService.increaseItem(userId, productId));
    }

    @PostMapping("/{userId}/decrease/{productId}")
    public ResponseEntity<CartDTO> decreaseItem(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(cartService.decreaseItem(userId, productId));
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<CartDTO> clearCart(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.clearCart(userId));
    }
}