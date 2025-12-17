package eindproject.webshop.dto.product.ipad;

import eindproject.webshop.model.enums.ipad.IpadColor;
import eindproject.webshop.model.enums.ipad.IpadConnectivity;
import eindproject.webshop.model.enums.ipad.IpadGeneration;
import eindproject.webshop.model.enums.ipad.IpadStorage;
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

        IpadGeneration ipadGeneration,
        IpadStorage ipadStorage,
        IpadColor ipadColor,
        IpadConnectivity ipadConnectivity

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
