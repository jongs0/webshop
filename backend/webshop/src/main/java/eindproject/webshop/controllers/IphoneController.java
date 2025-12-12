package eindproject.webshop.controllers;

import eindproject.webshop.dto.product.iphone.IphoneCreateDTO;
import eindproject.webshop.dto.product.iphone.IphoneDTO;
import eindproject.webshop.dto.product.iphone.IphoneUpdateDTO;
import eindproject.webshop.service.IphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iphone")
public class IphoneController {

    final private IphoneService iphoneService;

    @Autowired
    public IphoneController(IphoneService iphoneService) {
        this.iphoneService = iphoneService;
    }

    //Iphone aanmaken
    @PostMapping
    public ResponseEntity<IphoneDTO> create(@RequestBody IphoneCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(iphoneService.createIphone(dto));
    }

    //Een iphone ophalen, GetProductsById (andere Kaart uit Trello)
    @GetMapping("/{id}")
    public ResponseEntity<IphoneDTO> getIphoneById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(iphoneService.getIphoneById(id));
    }

    //Alle iphones ophalen
    @GetMapping
    public ResponseEntity<IphoneDTO> getAllIphones() {
        return ResponseEntity.status(HttpStatus.CREATED).body(iphoneService.getAllIphones());
    }

    //Iphone aanpassen
    @PutMapping
    public ResponseEntity<IphoneDTO> update(@PathVariable Long id, @RequestBody IphoneUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(iphoneService.updateIphone(id, dto));
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
