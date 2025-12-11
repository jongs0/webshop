package eindproject.webshop.controllers;

import eindproject.webshop.dto.appuser.AppUserCreateDTO;
import eindproject.webshop.dto.appuser.AppUserDTO;
import eindproject.webshop.dto.appuser.AppUserSummaryDTO;
import eindproject.webshop.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("examplepath")
public class AppUserController {
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) { this.appUserService = appUserService; }

    // Incoming POST for new users - createUser method
    // Incoming GET for single user (for profile page) - getUser method
    // Incoming GET for all users (admin-only) - getAllUsers method
    // Incoming PUT for data update - updateUser method
    // optional incoming DELETE for single user (admin-only) - deleteUser method

    @PostMapping
    public ResponseEntity<AppUserSummaryDTO> createAccount(@Valid @RequestBody AppUserCreateDTO createDTO)
    {
        AppUserSummaryDTO created = appUserService.createAccount(createDTO);
        return ResponseEntity.status(HttpStatus.OK).body(created);
    }

}
