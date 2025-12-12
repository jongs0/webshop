package eindproject.webshop.controllers;


import eindproject.webshop.dto.product.iwatch.IwatchCreateDTO;
import eindproject.webshop.dto.product.iwatch.IwatchDTO;
import eindproject.webshop.dto.product.iwatch.IwatchUpdateDTO;
import eindproject.webshop.service.IwatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/iwatch")
@CrossOrigin("*")
public class IwatchController {

    private final IwatchService iwatchService;

    public IwatchController(IwatchService iwatchService) {
        this.iwatchService = iwatchService;
    }

    @PostMapping
    public ResponseEntity<IwatchDTO> create(@RequestBody IwatchCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(iwatchService.createIwatch(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IwatchDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(iwatchService.getIwatchById(id));
    }

    @GetMapping
    public ResponseEntity<List<IwatchDTO>> getAll() {
        return ResponseEntity.ok(iwatchService.getAllIwatches());
    }

    @PutMapping("/{id}")
    public ResponseEntity<IwatchDTO> update(@PathVariable Long id, @RequestBody IwatchUpdateDTO dto) {
        return ResponseEntity.ok(iwatchService.updateIwatch(id, dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {iwatchService.deleteIwatch(id);
    }
}
