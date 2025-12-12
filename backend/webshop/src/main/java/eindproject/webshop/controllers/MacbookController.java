package eindproject.webshop.controllers;


import eindproject.webshop.dto.product.macbook.MacbookCreateDTO;
import eindproject.webshop.dto.product.macbook.MacbookDTO;
import eindproject.webshop.dto.product.macbook.MacbookUpdateDTO;
import eindproject.webshop.service.MacbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/macbook")
public class MacbookController {

    private final MacbookService macbookService;

    @Autowired
    public MacbookController(MacbookService macbookService) {
        this.macbookService = macbookService;
    }

    @PostMapping
    public ResponseEntity<MacbookDTO> create(@RequestBody MacbookCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(macbookService.createMacbook(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MacbookDTO> getMacbookById(@PathVariable Long id) {
        return ResponseEntity.ok(macbookService.getMacbookById(id));
    }

    @GetMapping
    public ResponseEntity<List<MacbookDTO>> getAllMacbooks() {
        return ResponseEntity.ok(macbookService.getAllMacbooks());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MacbookDTO> update(@PathVariable Long id, @RequestBody MacbookUpdateDTO dto
    ) {
        return ResponseEntity.ok(macbookService.updateMacbook(id, dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {macbookService.deleteMacbook(id);
    }
}