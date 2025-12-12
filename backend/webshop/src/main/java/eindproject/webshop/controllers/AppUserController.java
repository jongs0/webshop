package eindproject.webshop.controllers;

import eindproject.webshop.dto.appuser.AppUserCreateDTO;
import eindproject.webshop.dto.appuser.AppUserDTO;
import eindproject.webshop.dto.appuser.AppUserSummaryDTO;
import eindproject.webshop.dto.appuser.AppUserUpdateDTO;
import eindproject.webshop.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/userAPI")
public class AppUserController {
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    // Incoming GET for single user (for profile page) - getUser method
    // Incoming GET for all users (admin-only) - getAllUsers method
    // Incoming PUT for data update - updateUser method
    // optional incoming DELETE for single user (admin-only) - deleteUser method

    @PostMapping
    public ResponseEntity<AppUserSummaryDTO> createAppUser(@Valid @RequestBody AppUserCreateDTO createDTO) {
        AppUserSummaryDTO created = appUserService.createAppUser(createDTO);
        return ResponseEntity.status(HttpStatus.OK).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUserDTO> getAppUserById(@PathVariable Long id) {
        AppUserDTO appUser = appUserService.findAppUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(appUser);
    }

    @GetMapping("/{email}")
    public ResponseEntity<AppUserDTO> getAppUserByEmail(@PathVariable String email) {
        AppUserDTO appUser = appUserService.findAppUserByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(appUser);
    }

    @GetMapping
    public ResponseEntity<List<AppUserDTO>> getAllAppUsers() {
        List<AppUserDTO> allUsers = appUserService.findAllAppUsers();
        return ResponseEntity.status(HttpStatus.OK).body(allUsers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppUserSummaryDTO> updateUser(@PathVariable Long id, @Valid @RequestBody AppUserUpdateDTO updateDTO) {
        AppUserSummaryDTO updated = appUserService.updateUser(id, updateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }
}
