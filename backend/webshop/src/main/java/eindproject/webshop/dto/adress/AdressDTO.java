package eindproject.webshop.dto.adress;

import eindproject.webshop.model.appuser.Adress;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdressDTO(
        @NotNull
        Long id,
        @NotBlank
        String street,
        @NotNull
        Integer houseNumber,
        @NotBlank
        String postalCode,
        @NotBlank
        String city
) {
    public static AdressDTO fromEntity(Adress adress) {
        return new AdressDTO(
                adress.getId(),
                adress.getStreet(),
                adress.getHouseNumber(),
                adress.getPostalCode(),
                adress.getCity()
        );
    }
}
