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
    public Adress toEntity() {
        Adress adress = new Adress();
        adress.setStreet(this.street);
        adress.setHouseNumber(this.houseNumber);
        adress.setPostalCode(this.postalCode);
        adress.setCity(this.city);
        return adress;
    }
}
