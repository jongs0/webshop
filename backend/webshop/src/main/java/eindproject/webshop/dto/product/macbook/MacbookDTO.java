package eindproject.webshop.dto.product.macbook;

import eindproject.webshop.model.enums.macbook.*;
import eindproject.webshop.model.enums.product.*;
import eindproject.webshop.model.product.Macbook;
import jakarta.validation.constraints.*;

public record MacbookDTO(
        @NotNull
        Long id,
        @NotBlank
        String name,
        @NotBlank
        String description,
        @NotNull
        Double price,
        @NotNull
        Integer stock,
        @NotNull
        State state,
        @NotBlank
        String model,
        @NotNull
        Integer releaseYear,
        @NotNull
        ChipType chipType,
        @NotNull
        RamSize ram,
        @NotNull
        Storage storage,
        @NotNull
        Color color)
{
    public MacbookDTO fromEntity(Macbook macbook) {
        return new MacbookDTO(
                macbook.getId(),
                macbook.getName(),
                macbook.getDescription(),
                macbook.getPrice(),
                macbook.getStock(),
                macbook.getState(),
                macbook.getModel(),
                macbook.getReleaseYear(),
                macbook.getChipType(),
                macbook.getRamSize(),
                macbook.getStorage(),
                macbook.getColor()
        );
    }
}
