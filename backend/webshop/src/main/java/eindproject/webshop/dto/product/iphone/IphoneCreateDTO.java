package eindproject.webshop.dto.product.iphone;

import eindproject.webshop.model.enums.iphone.*;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Iphone;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IphoneCreateDTO(

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
        NetworkType networkType,

        @NotNull
        Color color,

        @NotNull
        SimType simType

) {

    public Iphone toEntity() {

        Iphone iphone = new Iphone();

        iphone.setName(this.name);
        iphone.setDescription(this.description);
        iphone.setPrice(this.price);
        iphone.setStock(this.stock);
        iphone.setState(this.state);
        iphone.setModel(this.model);

        iphone.setGeneration(this.generation);
        iphone.setStorage(this.storage);
        iphone.setNetworkType(this.networkType);
        iphone.setColor(this.color);
        iphone.setSimType(this.simType);

        return iphone;
    }
}