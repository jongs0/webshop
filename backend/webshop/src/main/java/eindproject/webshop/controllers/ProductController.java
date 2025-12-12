package eindproject.webshop.controllers;

import eindproject.webshop.dto.product.ProductAdminSummaryDTO;
import eindproject.webshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {

    final private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/admin")
    public List<ProductAdminSummaryDTO> getAllProductsForAdmin() {
        return productService.getAllProductsForAdmin();
    }
}
