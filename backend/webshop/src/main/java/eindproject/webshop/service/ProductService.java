package eindproject.webshop.service;

import eindproject.webshop.model.product.Product;
import eindproject.webshop.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
