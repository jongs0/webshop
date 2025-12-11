package eindproject.webshop.dto.cart;

import eindproject.webshop.model.cart.Cart;
import eindproject.webshop.service.ProductService;

import java.util.List;

public record CartDTO(
        Long id,
        Long userId,
        List<CartProductDTO> cartProductDTOs
) {
    public static CartDTO fromEntity(Cart cart, ProductService productService) {
        List<CartProductDTO> cartProductDTOs = cart.getCartItems() == null ? List.of()
                : cart.getCartItems()
                .stream()
                .map(cartItem -> CartProductDTO.fromEntity(cartItem, productService))
                .toList();

        return new CartDTO(
                cart.getId(),
                cart.getAppUser().getId(),
                cartProductDTOs
        );
    }
}
