package eindproject.webshop.dto.product.iphone;

import eindproject.webshop.model.enums.iphone.*;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Iphone;

public record IphoneUpdateDTO(

        String name,
        String description,
        Double price,
        Integer stock,
        State state,
        String model,

        IphoneGeneration iphoneGeneration,
        IphoneStorage iphoneStorage,
        IphoneNetworkType iphoneNetworkType,
        IphoneColor iphoneColor,
        IphoneSimType iphoneSimType

) {

    public void updateIphone(Iphone iphone) {

        iphone.setName(name);
        iphone.setDescription(description);
        iphone.setPrice(price);
        iphone.setStock(stock);
        iphone.setState(state);
        iphone.setModel(model);

        iphone.setGeneration(iphoneGeneration);
        iphone.setStorage(iphoneStorage);
        iphone.setNetworkType(iphoneNetworkType);
        iphone.setColor(iphoneColor);
        iphone.setSimType(iphoneSimType);
    }
}