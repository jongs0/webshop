package eindproject.webshop.dto.product.ipad;

import eindproject.webshop.model.enums.ipad.*;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Ipad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IpadCreateDTO(

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
        IpadGeneration ipadGeneration,

        @NotNull
        IpadStorage ipadStorage,

        @NotNull
        IpadConnectivity ipadConnectivity,

        @NotNull
        IpadColor ipadColor,

        @NotNull
        Category category

) {

    public Ipad toEntity() {

        Ipad ipad = new Ipad();

        ipad.setName(this.name);
        ipad.setDescription(this.description);
        ipad.setPrice(this.price);
        ipad.setStock(this.stock);
        ipad.setState(this.state);
        ipad.setModel(this.model);

        ipad.setGeneration(this.ipadGeneration);
        ipad.setStorage(this.ipadStorage);
        ipad.setConnectivity(this.ipadConnectivity);
        ipad.setColor(this.ipadColor);
        ipad.setCategory(this.category);

        return ipad;
    }
}
