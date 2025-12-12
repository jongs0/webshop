package eindproject.webshop.controllers;

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

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{appUserId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Long appUserId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.getCartByUserId(appUserId));
    }

    @PostMapping("/{appUserId}/add/{productId}")
    public ResponseEntity<CartDTO> addToCart(
            @PathVariable Long appUserId,
            @PathVariable Long productId,
            @RequestParam int quantity
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addToCart(appUserId, productId, quantity));
    }


    @PutMapping("/{appUserId}/update/{productId}")
    public ResponseEntity<CartDTO> updateItem(
            @PathVariable Long appUserId,
            @PathVariable Long productId,
            @RequestParam int quantity
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.updateItem(appUserId, productId, quantity));
    }

    @DeleteMapping("/{appUserId}/clear")
    public ResponseEntity<CartDTO> clearCart(@PathVariable Long appUserId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.clearCart(appUserId));
    }
}