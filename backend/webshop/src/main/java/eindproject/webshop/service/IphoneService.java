package eindproject.webshop.service;

import eindproject.webshop.dto.product.iphone.IphoneCreateDTO;
import eindproject.webshop.dto.product.iphone.IphoneDTO;
import eindproject.webshop.dto.product.iphone.IphoneUpdateDTO;
import eindproject.webshop.model.product.Iphone;
import eindproject.webshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IphoneService {

    final private ProductRepository productRepository;

    @Autowired
    public IphoneService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //createIphone (to Entity is rood omdat de DTO van Iphone mist nog dus die is nu rood)
    public IphoneDTO createIphone(IphoneCreateDTO dto) {
        Iphone iphone = dto.toEntity();
        Iphone saved = productRepository.save(iphone);
        return IphoneDTO.fromEntity(saved);
//        return new IphoneDTO(saved);
    }

    //Get IphoneById
    public IphoneDTO getIphoneById(Long id) {
        Iphone iphone = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Iphone not found"));
        return new IphoneDTO(iphone);
    }

    //get all iphones
    public IphoneDTO getAllIphones() {
        return productRepository.findAll()
                .stream()
                .map(IphoneDTO::new)
                .toList();
    }

    //Update iphone
    public IphoneDTO updateIphone(Long id, IphoneUpdateDTO dto) {
        Iphone iphone = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Iphone not found"));
        dto.toEntity(iphone);
        Iphone saved = productRepository.save(iphone);
        return new IphoneUpdateDTO.fromEntity(saved);
//        return new IphoneDTO(saved);
    }


    //Delete iphone
    public void deleteIphone(Long id) {
        productRepository.deleteById(id);
    }



}
