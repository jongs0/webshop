package eindproject.webshop.dto.appuser;

import eindproject.webshop.model.Role;
import eindproject.webshop.model.appuser.AppUser;
import jakarta.validation.constraints.NotBlank;

public record AppUserCreateDTO(
        @NotBlank(message = "Fields cannot be empty")
        String email,
        @NotBlank(message = "Fields cannot be empty")
        String password,
        @NotBlank(message = "Fields cannot be empty")
        String firstName,
        @NotBlank(message = "Fields cannot be empty")
        String lastName,
        @NotBlank(message = "Fields cannot be empty")
        Role role
) {
    public AppUser toEntity() {
        AppUser appUser = new AppUser();
        appUser.setEmail(this.email);
        appUser.setPassword(this.password);
        // vervang setPassword met een hash later als we security doen
        appUser.setFirstName(this.firstName);
        appUser.setLastName(this.lastName);
        appUser.setRole(role);
        return appUser;
    }
}
