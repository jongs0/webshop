package eindproject.webshop.dto.product.iphone;

import eindproject.webshop.model.enums.iphone.IphoneGeneration;
import eindproject.webshop.model.product.Iphone;

public record IphoneSummaryDTO(

        Long id,
        String name,
        Double price,
        String model,
        IphoneGeneration iphoneGeneration

) {

    public static IphoneSummaryDTO fromEntity(Iphone iphone) {
        return new IphoneSummaryDTO(
                iphone.getId(),
                iphone.getName(),
                iphone.getPrice(),
                iphone.getModel(),
                iphone.getGeneration()
        );
    }
}