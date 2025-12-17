package eindproject.webshop.dto.cart;

import eindproject.webshop.model.cart.Cart;
import eindproject.webshop.model.cart.CartItem;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CartUpdateDTO(
        @NotNull
        List<CartProductDTO> cartProductDTOs
) {
    public void update(Cart cart) {

        List<CartItem> cartItems = cartProductDTOs.stream()
                .map(CartProductDTO::toEntity)
                .toList();
        cartItems.forEach(cartItem -> cartItem.setCart(cart));

        cart.setCartItems(cartItems);
    }
}
