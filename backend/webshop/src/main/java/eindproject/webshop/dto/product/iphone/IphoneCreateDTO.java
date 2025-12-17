package eindproject.webshop.dto.product.iphone;

import eindproject.webshop.model.enums.iphone.*;
import eindproject.webshop.model.enums.product.Category;
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
        IphoneGeneration iphoneGeneration,

        @NotNull
        IphoneStorage iphoneStorage,

        @NotNull
        IphoneNetworkType iphoneNetworkType,

        @NotNull
        IphoneColor iphoneColor,

        @NotNull
        IphoneSimType iphoneSimType,

        @NotNull
        Category category

) {

    public Iphone toEntity() {

        Iphone iphone = new Iphone();

        iphone.setName(this.name);
        iphone.setDescription(this.description);
        iphone.setPrice(this.price);
        iphone.setStock(this.stock);
        iphone.setState(this.state);
        iphone.setModel(this.model);

        iphone.setGeneration(this.iphoneGeneration);
        iphone.setStorage(this.iphoneStorage);
        iphone.setNetworkType(this.iphoneNetworkType);
        iphone.setColor(this.iphoneColor);
        iphone.setSimType(this.iphoneSimType);
        iphone.setCategory(this.category);

        return iphone;
    }
}