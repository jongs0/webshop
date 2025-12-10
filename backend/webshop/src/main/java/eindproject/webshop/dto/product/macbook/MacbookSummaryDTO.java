package eindproject.webshop.dto.product.macbook;

import eindproject.webshop.model.product.Macbook;
import jakarta.validation.constraints.*;

public record MacbookSummaryDTO(
        @NotNull
        Long id,
        @NotBlank
        String name,
        @NotNull
        Double price,
        @NotBlank
        String model,
        @NotNull
        Integer releaseYear
) {
    public MacbookSummaryDTO fromEntity(Macbook macbook) {
        return new MacbookSummaryDTO(
                macbook.getId(),
                macbook.getName(),
                macbook.getPrice(),
                macbook.getModel(),
                macbook.getReleaseYear()
        );
    }
}
