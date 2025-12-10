package eindproject.webshop.dto.appuser;

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
        String lastName
) {
    public AppUser toEntity() {
        AppUser user = new AppUser();
        user.setEmail(this.email);
        user.setPassword(this.password);
        // vervang setPassword met een hash later als we security doen
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        return user;
    }
}
