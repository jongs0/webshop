package eindproject.webshop.dto.appuser;

import eindproject.webshop.dto.adress.AddressCreateDTO;
import eindproject.webshop.model.appuser.AppUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AppUserCreateDTO(
        @NotBlank(message = "Fields cannot be empty")
        @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
        String email,
        @NotBlank(message = "Fields cannot be empty")
        @Size(min = 8, message = "Password must be at least 8 characters long.")
        String password,
        @NotBlank(message = "Fields cannot be empty")
        String firstName,
        @NotBlank(message = "Fields cannot be empty")
        String lastName
) {
    public AppUser toEntity() {
        AppUser appUser = new AppUser();
        appUser.setEmail(this.email);
        appUser.setPassword(this.password);
        appUser.setFirstName(this.firstName);
        appUser.setLastName(this.lastName);
        return appUser;
    }
}
