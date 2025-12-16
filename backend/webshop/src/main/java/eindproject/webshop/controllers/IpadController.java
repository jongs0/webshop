package eindproject.webshop.controllers;

import eindproject.webshop.dto.product.ipad.IpadCreateDTO;
import eindproject.webshop.dto.product.ipad.IpadDTO;
import eindproject.webshop.dto.product.ipad.IpadUpdateDTO;
import eindproject.webshop.service.IpadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ipad")
public class IpadController {

    final private IpadService ipadService;

    @Autowired
    public IpadController(IpadService ipadService) {
        this.ipadService = ipadService;
    }

    @PostMapping
    public ResponseEntity<IpadDTO> create(@RequestBody IpadCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ipadService.createIpad(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IpadDTO> getIpadById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ipadService.getIpadById(id));
    }

    @GetMapping
    public ResponseEntity<List<IpadDTO>> getAllIpads() {
        return ResponseEntity.status(HttpStatus.CREATED).body(ipadService.getAllIpads());
    }

    @PutMapping
    public ResponseEntity<IpadDTO> update(@PathVariable Long id, @RequestBody IpadUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ipadService.updateIpad(id, dto));
    }

    @DeleteMapping
    public void delete (@PathVariable Long id) {
        ipadService.deleteIpad(id);
    }
}
