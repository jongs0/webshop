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
        ChipType chipType,
        @NotNull
        RamSize ram,
        @NotNull
        Storage storage,
        @NotNull
        Color color,
        @NotBlank
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
        macbook.setChipType(this.chipType);
        macbook.setRamSize(this.ram);
        macbook.setStorage(this.storage);
        macbook.setColor(this.color);
        macbook.setCategory(this.category);
        return macbook;
    }
}
