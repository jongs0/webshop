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

        Generation generation,
        Storage storage,
        NetworkType networkType,
        Color color,
        SimType simType

) {

    public void updateIphone(Iphone iphone) {

        iphone.setName(name);
        iphone.setDescription(description);
        iphone.setPrice(price);
        iphone.setStock(stock);
        iphone.setState(state);
        iphone.setModel(model);

        iphone.setGeneration(generation);
        iphone.setStorage(storage);
        iphone.setNetworkType(networkType);
        iphone.setColor(color);
        iphone.setSimType(simType);
    }
}