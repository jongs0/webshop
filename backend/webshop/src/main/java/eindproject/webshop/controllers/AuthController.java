package eindproject.webshop.controllers;

import eindproject.webshop.dto.appuser.AppUserDTO;
import eindproject.webshop.dto.appuser.AppUserSummaryDTO;
import eindproject.webshop.dto.authentication.RegisterDTO;
import eindproject.webshop.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {
    private final AppUserService appUserService;

    @Autowired
    public AuthController(AppUserService userService) {
        this.appUserService = userService;
    }

    @PostMapping
    public ResponseEntity<AppUserDTO> register(@Valid @RequestBody RegisterDTO userRegisterDTO) {
        AppUserDTO user = this.appUserService.createAppUser(userRegisterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @GetMapping("/login")
    public ResponseEntity<AppUserSummaryDTO> me(Authentication authentication) {
        return ResponseEntity.ok(
                appUserService.findAppUserByEmail(authentication.getName())
        );
    }
}
