package eindproject.webshop.controllers;

import eindproject.webshop.dto.appuser.AppUserCreateDTO;
import eindproject.webshop.dto.appuser.AppUserDTO;
import eindproject.webshop.dto.appuser.AppUserSummaryDTO;
import eindproject.webshop.dto.authentication.RegisterDTO;
import eindproject.webshop.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AppUserService userService;

    @Autowired
    public AuthController(AppUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<AppUserDTO> register(@Valid @RequestBody RegisterDTO userRegisterDTO) {
        AppUserDTO user = this.userService.createAppUser(userRegisterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
