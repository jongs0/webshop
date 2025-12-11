package eindproject.webshop.dto.product.ipad;

import eindproject.webshop.model.enums.ipad.Color;
import eindproject.webshop.model.enums.ipad.Connectivity;
import eindproject.webshop.model.enums.ipad.Generation;
import eindproject.webshop.model.enums.ipad.Storage;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Ipad;

public record IpadDTO(

        Long id,
        String name,
        String description,
        Double price,
        Integer stock,
        State state,
        String model,

        Generation generation,
        Storage storage,
        Color color,
        Connectivity connectivity

) {
    public static IpadDTO fromEntity(Ipad ipad) {
        return new IpadDTO(

        ipad.getId(),
        ipad.getName(),
        ipad.getDescription(),
        ipad.getPrice(),
        ipad.getStock(),
        ipad.getState(),
        ipad.getModel(),

        ipad.getGeneration(),
        ipad.getStorage(),
        ipad.getColor(),
        ipad.getConnectivity()

        );
    }
}
