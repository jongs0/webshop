package eindproject.webshop.dto.product.macbook;

import eindproject.webshop.model.enums.macbook.MacbookChipType;
import eindproject.webshop.model.enums.macbook.MacbookColor;
import eindproject.webshop.model.enums.macbook.MacbookRamSize;
import eindproject.webshop.model.enums.macbook.MacbookStorage;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Macbook;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MacbookUpdateDTO(
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
        MacbookChipType macbookChipType,
        @NotNull
        MacbookRamSize macbookRamSize,
        @NotNull
        MacbookStorage macbookStorage,
        @NotNull
        MacbookColor macbookColor
) {
    public void updateMacbook(Macbook macbook) {
        macbook.setName(this.name);
        macbook.setDescription(this.description);
        macbook.setPrice(this.price);
        macbook.setStock(this.stock);
        macbook.setState(this.state);
        macbook.setModel(this.model);
        macbook.setReleaseYear(this.releaseYear);
        macbook.setChipType(this.macbookChipType);
        macbook.setRamSize(this.macbookRamSize);
        macbook.setStorage(this.macbookStorage);
        macbook.setColor(this.macbookColor);
    }
}
