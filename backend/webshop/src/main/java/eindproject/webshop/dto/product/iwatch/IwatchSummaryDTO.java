package eindproject.webshop.dto.product.iwatch;

import eindproject.webshop.model.product.Iwatch;

public record IwatchSummaryDTO(

        Long id,
        String name,
        Double price,
        String model,
        Integer releaseYear
) {

    public static IwatchSummaryDTO fromEntity(Iwatch iwatch) {
        return new IwatchSummaryDTO(
                iwatch.getId(),
                iwatch.getName(),
                iwatch.getPrice(),
                iwatch.getModel(),
                iwatch.getReleaseYear()
        );
    }
}
