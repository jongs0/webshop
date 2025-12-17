package eindproject.webshop.dto.adress;

import eindproject.webshop.model.appuser.Adress;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddressSummaryDTO(
        @NotNull
        Long id,
        @NotBlank
        String city,
        @NotBlank
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
