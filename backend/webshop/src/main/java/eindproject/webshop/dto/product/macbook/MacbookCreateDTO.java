package eindproject.webshop.dto.product.macbook;

import eindproject.webshop.model.enums.macbook.*;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Macbook;
import jakarta.validation.constraints.*;

public record MacbookCreateDTO(
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
        MacbookColor macbookColor,
        @NotNull
        Category category
) {
    public Macbook toEntity() {
        Macbook macbook = new Macbook();
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
        macbook.setCategory(this.category);
        return macbook;
    }
}
