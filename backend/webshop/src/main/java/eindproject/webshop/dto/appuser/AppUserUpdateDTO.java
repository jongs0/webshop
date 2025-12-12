package eindproject.webshop.dto.appuser;

import eindproject.webshop.model.appuser.Adress;
import eindproject.webshop.model.appuser.AppUser;
import jakarta.validation.constraints.NotBlank;

public record AppUserUpdateDTO(
        @NotBlank
        String email,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotBlank
        Adress address
) {
    public AppUser toEntity() {
        AppUser appUser = new AppUser();
        appUser.setEmail(email);
        appUser.setFirstName(firstName);
        appUser.setLastName(lastName);
        appUser.setAdress(address);
        return appUser;
    }
}
