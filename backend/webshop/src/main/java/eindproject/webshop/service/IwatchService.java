package eindproject.webshop.service;


import eindproject.webshop.dto.product.iwatch.IwatchCreateDTO;
import eindproject.webshop.dto.product.iwatch.IwatchDTO;
import eindproject.webshop.dto.product.iwatch.IwatchUpdateDTO;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.product.Iwatch;
import eindproject.webshop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IwatchService {

    private final ProductRepository productRepository;

    public IwatchService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public IwatchDTO createIwatch(IwatchCreateDTO dto) {
        Iwatch iwatch = dto.toEntity();
        Iwatch saved = productRepository.save(iwatch);
        return IwatchDTO.fromEntity(saved);
    }

    public IwatchDTO getIwatchById(Long id) {
        Iwatch iwatch = productRepository
                .findIwatchByIdAndCategory(id, Category.IWATCH)
                .orElseThrow(() -> new RuntimeException("iWatch not found"));

        return IwatchDTO.fromEntity(iwatch);
    }

    public List<IwatchDTO> getAllIwatches() {
        return productRepository.findByCategory(Category.IWATCH)
                .stream()
                .map(product -> IwatchDTO.fromEntity((Iwatch) product))
                .toList();
    }

    public IwatchDTO updateIwatch(Long id, IwatchUpdateDTO dto) {
        Iwatch iwatch = productRepository
                .findIwatchByIdAndCategory(id, Category.IWATCH)
                .orElseThrow(() -> new RuntimeException("iWatch not found"));

        dto.updateIwatch(iwatch);

        Iwatch saved = productRepository.save(iwatch);
        return IwatchDTO.fromEntity(saved);
    }

    public void deleteIwatch(Long id) {
        productRepository.deleteById(id);
    }
}
