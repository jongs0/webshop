package eindproject.webshop.dto.adress;

import eindproject.webshop.model.appuser.Adress;

public record AddressUpdateDTO(
        String street,
        Integer houseNumber,
        String postalCode,
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
