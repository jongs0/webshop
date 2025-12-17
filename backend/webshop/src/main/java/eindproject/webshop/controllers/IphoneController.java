package eindproject.webshop.controllers;

import eindproject.webshop.dto.product.iphone.IphoneCreateDTO;
import eindproject.webshop.dto.product.iphone.IphoneDTO;
import eindproject.webshop.dto.product.iphone.IphoneUpdateDTO;
import eindproject.webshop.service.product.IphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
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
        return ResponseEntity.status(HttpStatus.OK).body(iphoneService.getIphoneById(id));
    }

    //Alle iphones ophalen
    @GetMapping
    public ResponseEntity<List<IphoneDTO>> getAllIphones() {
        return ResponseEntity.status(HttpStatus.OK).body(iphoneService.getAllIphones());
    }

    //Iphone aanpassen
    @PutMapping("/{id}")
    public ResponseEntity<IphoneDTO> update(@PathVariable Long id, @RequestBody IphoneUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(iphoneService.updateIphone(id, dto));
    }
}
