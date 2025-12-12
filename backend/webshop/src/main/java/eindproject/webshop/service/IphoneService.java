package eindproject.webshop.service;

import eindproject.webshop.dto.product.iphone.IphoneCreateDTO;
import eindproject.webshop.dto.product.iphone.IphoneDTO;
import eindproject.webshop.dto.product.iphone.IphoneUpdateDTO;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.product.Iphone;
import eindproject.webshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IphoneService {

    final private ProductRepository productRepository;

    @Autowired
    public IphoneService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public IphoneDTO createIphone(IphoneCreateDTO dto) {
        Iphone iphone = dto.toEntity();
        Iphone saved = productRepository.save(iphone);
        return IphoneDTO.fromEntity(saved);
//        return new IphoneDTO(saved);
    }

    //Get IphoneById
    public IphoneDTO getIphoneById(Long id) {
        Iphone iphone = productRepository.findIphoneByIdAndCategory(id, Category.IPHONE)
                .orElseThrow(() -> new RuntimeException("Iphone not found"));
        return IphoneDTO.fromEntity(iphone);
    }

    //get all iphones
    public List<IphoneDTO> getAllIphones() {
        return productRepository.findByCategory(Category.IPHONE)
                .stream()
                .map(product -> IphoneDTO.fromEntity((Iphone) product))
                .toList();
    }

    //Update iphone
    public IphoneDTO updateIphone(Long id, IphoneUpdateDTO dto) {
        Iphone iphone = productRepository.findIphoneByIdAndCategory(id, Category.IPHONE)
                .orElseThrow(() -> new RuntimeException("Iphone not found"));
        dto.updateIphone(iphone);
        Iphone saved = productRepository.save(iphone);
        return IphoneDTO.fromEntity(saved);
    }


    //Delete iphone
    public void deleteIphone(Long id) {
        productRepository.deleteById(id);
    }



}
