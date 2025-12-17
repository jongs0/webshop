package eindproject.webshop.dto.product;

import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Product;

public record ProductAdminSummaryDTO(
        Long id,
        String name,
        Category category,
        Double price,
        Integer stock,
        State state
) {
    public static ProductAdminSummaryDTO fromEntity(Product product) {
        return new ProductAdminSummaryDTO(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getStock(),
                product.getState()
        );
    }
}
