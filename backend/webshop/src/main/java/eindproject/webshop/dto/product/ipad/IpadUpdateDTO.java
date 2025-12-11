package eindproject.webshop.dto.product.ipad;

import eindproject.webshop.model.enums.ipad.Color;
import eindproject.webshop.model.enums.ipad.Connectivity;
import eindproject.webshop.model.enums.ipad.Generation;
import eindproject.webshop.model.enums.ipad.Storage;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Ipad;

public record IpadUpdateDTO(

        String name,
        String description,
        Double price,
        Integer stock,
        State state,
        String model,

        Generation generation,
        Storage storage,
        Connectivity connectivity,
        Color color
) {
    public void updateIpad(Ipad ipad) {

        ipad.setName(name);
        ipad.setDescription(description);
        ipad.setPrice(price);
        ipad.setStock(stock);
        ipad.setState(state);
        ipad.setModel(model);

        ipad.setGeneration(generation);
        ipad.setStorage(storage);
        ipad.setConnectivity(connectivity);
        ipad.setColor(color);
    }
}
