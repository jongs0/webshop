package eindproject.webshop.dto.adress;

import eindproject.webshop.model.appuser.Adress;
import jakarta.validation.constraints.*;

public record AddressUpdateDTO(
        @NotBlank
        String street,
        @NotNull
        Integer houseNumber,
        @NotBlank
        String postalCode,
        @NotBlank
        String city
) {
    public void applyTo(Adress adress) {
        adress.setStreet(street);
        adress.setHouseNumber(houseNumber);
        adress.setPostalCode(postalCode);
        adress.setCity(city);
    }
}
