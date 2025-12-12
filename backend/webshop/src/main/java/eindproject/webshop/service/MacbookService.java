package eindproject.webshop.service;

import eindproject.webshop.dto.product.macbook.MacbookCreateDTO;
import eindproject.webshop.dto.product.macbook.MacbookDTO;
import eindproject.webshop.dto.product.macbook.MacbookUpdateDTO;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.product.Macbook;
import eindproject.webshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MacbookService {

    private final ProductRepository productRepository;

    @Autowired
    public MacbookService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public MacbookDTO createMacbook(MacbookCreateDTO dto) {
        Macbook macbook = dto.toEntity();
        Macbook saved = productRepository.save(macbook);
        return MacbookDTO.fromEntity(saved);
    }

    public MacbookDTO getMacbookById(Long id) {
        Macbook macbook = productRepository
                .findMacbookByIdAndCategory(id, Category.MACBOOK)
                .orElseThrow(() -> new RuntimeException("Macbook not found"));

        return MacbookDTO.fromEntity(macbook);
    }

    public List<MacbookDTO> getAllMacbooks() {
        return productRepository.findByCategory(Category.MACBOOK)
                .stream()
                .map(product -> MacbookDTO.fromEntity((Macbook) product))
                .toList();
    }

    public MacbookDTO updateMacbook(Long id, MacbookUpdateDTO dto) {
        Macbook macbook = productRepository
                .findMacbookByIdAndCategory(id, Category.MACBOOK)
                .orElseThrow(() -> new RuntimeException("Macbook not found"));

        dto.updateMacbook(macbook);

        Macbook saved = productRepository.save(macbook);
        return MacbookDTO.fromEntity(saved);
    }

    public void deleteMacbook(Long id) {
        productRepository.deleteById(id);
    }
}
