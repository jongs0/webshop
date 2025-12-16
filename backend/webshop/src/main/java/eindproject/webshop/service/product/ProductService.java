package eindproject.webshop.service.product;

import eindproject.webshop.dto.product.ProductAdminSummaryDTO;
import eindproject.webshop.model.product.Product;
import eindproject.webshop.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product findEntityById(Long id) {
        return productRepository.findById(id)
                 .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + id));
    }

    public List<ProductAdminSummaryDTO> getAllProductsForAdmin() {
        return productRepository.findAll()
                .stream()
                .map(ProductAdminSummaryDTO::fromEntity)
                .toList();
    }

    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + id));

        productRepository.deleteById(product.getId());
    }
}
