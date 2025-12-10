package eindproject.webshop.dto.adress;

import eindproject.webshop.model.appuser.Adress;

public record AddressSummaryDTO(
        Long id,
        String city,
        String postalCode
) {
    public AddressSummaryDTO fromEntity(Adress adress) {
        return new AddressSummaryDTO(
                adress.getId(),
                adress.getCity(),
                adress.getPostalCode()
        );
    }
}
