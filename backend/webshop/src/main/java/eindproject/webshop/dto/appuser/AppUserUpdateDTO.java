package eindproject.webshop.dto.appuser;

import eindproject.webshop.dto.adress.AddressUpdateDTO;
import eindproject.webshop.model.appuser.Adress;
import eindproject.webshop.model.appuser.AppUser;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AppUserUpdateDTO(
        @NotBlank
        String email,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotNull
        AddressUpdateDTO address
) {}