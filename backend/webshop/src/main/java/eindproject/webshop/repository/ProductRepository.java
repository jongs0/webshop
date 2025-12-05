package eindproject.webshop.repository;

import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.product.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository {
    List<Product> findByCategory(Category category);
}
