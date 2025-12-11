package eindproject.webshop.dto.cart;

import eindproject.webshop.model.cart.CartItem;
import eindproject.webshop.model.product.Product;
import eindproject.webshop.service.ProductService;

public record CartProductDTO(
        Long productId,
        String name,
        Double price,
        Integer quantity
) {
    public static CartProductDTO fromEntity(CartItem cartItem, ProductService productService) {
        Product product = productService.findEntityById(cartItem.getProductId());

        return new CartProductDTO(
                cartItem.getProductId(),
                product.getName(),
                product.getPrice(),
                cartItem.getQuantity()
        );

    }

    public CartItem toEntity() {
        CartItem cartItem = new CartItem();

        cartItem.setProductId(productId);
        cartItem.setQuantity(quantity);
        return cartItem;
    }
}
