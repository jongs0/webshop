package eindproject.webshop.controllers;

import eindproject.webshop.dto.product.ProductAdminSummaryDTO;
import eindproject.webshop.dto.product.ProductDTO;
import eindproject.webshop.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/products")
public class ProductController {

    final private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<ProductAdminSummaryDTO> getAllProductsForAdmin() {
        return productService.getAllProductsForAdmin();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/bestsellers")
    public List<ProductDTO> getBestSellers() {
        return productService.getBestSellers();
    }
}
