package eindproject.webshop.controllers;

import eindproject.webshop.dto.product.iphone.IphoneCreateDTO;
import eindproject.webshop.dto.product.iphone.IphoneDTO;
import eindproject.webshop.dto.product.iphone.IphoneUpdateDTO;
import eindproject.webshop.service.IphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product/iphone")
public class IphoneController {

    final private IphoneService iphoneService;

    @Autowired
    public IphoneController(IphoneService iphoneService) {
        this.iphoneService = iphoneService;
    }

    //Iphone aanmaken
    @PostMapping
    public IphoneDTO create(@RequestBody IphoneCreateDTO dto) {
        return iphoneService.createIphone(dto);
    }

    //Een iphone ophalen, GetProductsById (andere Kaart uit Trello)
    @GetMapping("/{id}")
    public IphoneDTO getIphoneById(Long id) {
        return iphoneService.getIphoneById(id);
    }

    //Alle iphones ophalen
    @GetMapping
    public IphoneDTO getAllIphones() {
        return iphoneService.getAllIphones();
    }

    //Iphone aanpassen
    @PutMapping
    public IphoneDTO update(@PathVariable Long id, @RequestBody IphoneUpdateDTO dto) {
        return iphoneService.updateIphone(id, dto);
    }

    //Iphone verwijderen
    @DeleteMapping
    public void delete (@PathVariable Long id) {
        iphoneService.deleteIphone(id);
    }

    //Check voor later:
    // Moeten we hier nog andere paden specificeren voor spring security later
    // zodat je wie er bij mag, of is allen de security config voldoende?



}
