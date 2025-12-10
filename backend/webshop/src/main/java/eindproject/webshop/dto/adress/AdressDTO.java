package eindproject.webshop.dto.adress;

import eindproject.webshop.model.appuser.Adress;

public record AdressDTO(
        Long id,
        String street,
        Integer houseNumber,
        String postalCode,
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
