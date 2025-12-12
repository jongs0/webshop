package eindproject.webshop.repository;

import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.product.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
    Optional<Iphone> findIphoneByIdAndCategory(Long id, Category category);
    Optional<Ipad> findIpadByIdAndCategory(Long id, Category category);
    Optional<Macbook> findMacbookByIdAndCategory(Long id, Category category);
    Optional<Iwatch> findIwatchByIdAndCategory(Long id, Category category);
}
