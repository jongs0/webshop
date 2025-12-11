package eindproject.webshop.dto.product.iphone;

import eindproject.webshop.model.enums.iphone.Generation;
import eindproject.webshop.model.product.Iphone;

public record IphoneSummaryDTO(

        Long id,
        String name,
        Double price,
        String model,
        Generation generation

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