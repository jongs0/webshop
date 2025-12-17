package eindproject.webshop.dto.product.iphone;

import eindproject.webshop.model.enums.iphone.*;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Iphone;

public record IphoneDTO(

        Long id,
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

    public static IphoneDTO fromEntity(Iphone iphone) {
        return new IphoneDTO(
                iphone.getId(),
                iphone.getName(),
                iphone.getDescription(),
                iphone.getPrice(),
                iphone.getStock(),
                iphone.getState(),
                iphone.getModel(),
                iphone.getGeneration(),
                iphone.getStorage(),
                iphone.getNetworkType(),
                iphone.getColor(),
                iphone.getSimType()
        );
    }
}