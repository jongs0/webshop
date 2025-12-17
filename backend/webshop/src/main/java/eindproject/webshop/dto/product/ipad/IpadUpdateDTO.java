package eindproject.webshop.dto.product.ipad;

import eindproject.webshop.model.enums.ipad.IpadColor;
import eindproject.webshop.model.enums.ipad.IpadConnectivity;
import eindproject.webshop.model.enums.ipad.IpadGeneration;
import eindproject.webshop.model.enums.ipad.IpadStorage;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Ipad;

public record IpadUpdateDTO(

        String name,
        String description,
        Double price,
        Integer stock,
        State state,
        String model,

        IpadGeneration ipadGeneration,
        IpadStorage ipadStorage,
        IpadConnectivity ipadConnectivity,
        IpadColor ipadColor
) {
    public void updateIpad(Ipad ipad) {

        ipad.setName(name);
        ipad.setDescription(description);
        ipad.setPrice(price);
        ipad.setStock(stock);
        ipad.setState(state);
        ipad.setModel(model);

        ipad.setGeneration(ipadGeneration);
        ipad.setStorage(ipadStorage);
        ipad.setConnectivity(ipadConnectivity);
        ipad.setColor(ipadColor);
    }
}
