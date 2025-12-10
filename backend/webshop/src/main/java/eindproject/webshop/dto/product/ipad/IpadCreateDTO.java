package eindproject.webshop.dto.product.ipad;

import eindproject.webshop.model.enums.ipad.*;
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
        Generation generation,

        @NotNull
        Storage storage,

        @NotNull
        Connectivity connectivity,

        @NotNull
        Color color

) {

    public Ipad toEntity() {

        Ipad ipad = new Ipad();

        ipad.setName(this.name);
        ipad.setDescription(this.description);
        ipad.setPrice(this.price);
        ipad.setStock(this.stock);
        ipad.setState(this.state);
        ipad.setModel(this.model);

        ipad.setGeneration(this.generation);
        ipad.setStorage(this.storage);
        ipad.setConnectivity(this.connectivity);
        ipad.setColor(this.color);

        return ipad;
    }
}
