package eindproject.webshop.dto.product;

import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Product;

public record ProductDTO(
        Long id,
        String name,
        Category category,
        Double price,
        Integer stock,
        State state
) {
    public static ProductDTO fromEntity(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getStock(),
                product.getState()
        );
    }
}
