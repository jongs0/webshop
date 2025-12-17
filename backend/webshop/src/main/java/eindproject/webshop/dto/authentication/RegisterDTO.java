package eindproject.webshop.dto.authentication;

import eindproject.webshop.dto.adress.AddressCreateDTO;
import eindproject.webshop.dto.appuser.AppUserCreateDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(

        @NotNull
        @Valid
        AppUserCreateDTO appUser,

        @NotNull
        @Valid
        AddressCreateDTO adress

) {
}