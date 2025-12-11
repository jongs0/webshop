package eindproject.webshop.controllers;

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
    public CartDTO getCart(@PathVariable Long appUserId) {
        return cartService.getCart(appUserId);
    }

    @PostMapping("/{appUserId}/add/{productId}")
    public CartDTO addToCart(
            @PathVariable Long appUserId,
            @PathVariable Long productId,
            @RequestParam int quantity
    ) {
        return cartService.addToCart(appUserId, productId, quantity);
    }


    @PutMapping("/{appUserId}/update/{productId}")
    public CartDTO updateItem(
            @PathVariable Long appUserId,
            @PathVariable Long productId,
            @RequestParam int quantity
    ) {
        return cartService.updateItem(appUserId, productId, quantity);
    }

    @DeleteMapping("/{appUserId}/clear")
    public CartDTO clearCart(@PathVariable Long appUserId) {
        return cartService.clearCart(appUserId);
    }
}