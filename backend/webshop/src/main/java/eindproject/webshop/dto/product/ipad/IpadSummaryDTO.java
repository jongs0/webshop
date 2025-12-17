package eindproject.webshop.dto.product.ipad;
import eindproject.webshop.model.enums.ipad.Generation;
import eindproject.webshop.model.product.Ipad;

public record IpadSummaryDTO(
        Long id,
        String name,
        Double price,
        String model,
        Generation generation
) {
    public static IpadSummaryDTO fromEntity(Ipad ipad) {
        return new IpadSummaryDTO(
                ipad.getId(),
                ipad.getName(),
                ipad.getPrice(),
                ipad.getModel(),
                ipad.getGeneration()
        );
    }
}


