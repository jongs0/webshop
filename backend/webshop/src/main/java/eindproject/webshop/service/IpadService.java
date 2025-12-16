package eindproject.webshop.service;

import eindproject.webshop.dto.product.ipad.IpadCreateDTO;
import eindproject.webshop.dto.product.ipad.IpadDTO;
import eindproject.webshop.dto.product.ipad.IpadUpdateDTO;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.product.Ipad;
import eindproject.webshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IpadService {

    final private ProductRepository productRepository;

    @Autowired
    public IpadService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public IpadDTO createIpad(IpadCreateDTO dto) {
        Ipad ipad = dto.toEntity();
        Ipad saved = productRepository.save(ipad);
        return IpadDTO.fromEntity(saved);
    }

    public IpadDTO getIpadById(Long id) {
        Ipad ipad = productRepository.findIpadByIdAndCategory(id, Category.IPAD)
                .orElseThrow(() -> new RuntimeException("Ipad not found"));
        return IpadDTO.fromEntity(ipad);
    }

    public List<IpadDTO> getAllIpads() {
        return productRepository.findByCategory(Category.IPAD)
                .stream()
                .map(product -> IpadDTO.fromEntity((Ipad) product))
                .toList();
    }

    public IpadDTO updateIpad(Long id, IpadUpdateDTO dto) {
        Ipad ipad = productRepository.findIpadByIdAndCategory(id, Category.IPAD)
                .orElseThrow(() -> new RuntimeException("Ipad not found"));
        dto.updateIpad(ipad);
        Ipad saved = productRepository.save(ipad);
        return IpadDTO.fromEntity(saved);
    }

    public void deleteIpad(Long id) {
        productRepository.deleteById(id);
    }

}
