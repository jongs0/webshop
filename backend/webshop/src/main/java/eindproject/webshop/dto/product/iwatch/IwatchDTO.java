package eindproject.webshop.dto.product.iwatch;

import eindproject.webshop.model.enums.iwatch.*;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Iwatch;

public record IwatchDTO(

        Long id,

        String name,
        String description,
        Double price,
        Integer stock,
        State state,
        String model,

        Integer releaseYear,
        IwatchCaseColor iwatchCaseColor,
        IwatchBandColor iwatchBandColor,
        IwatchConnectivity iwatchConnectivity,
        IwatchBandType iwatchBandType

) {

    public static IwatchDTO fromEntity(Iwatch iwatch) {
        return new IwatchDTO(
                iwatch.getId(),
                iwatch.getName(),
                iwatch.getDescription(),
                iwatch.getPrice(),
                iwatch.getStock(),
                iwatch.getState(),
                iwatch.getModel(),

                iwatch.getReleaseYear(),
                iwatch.getCaseColor(),
                iwatch.getBandColor(),
                iwatch.getConnectivity(),
                iwatch.getBandType()
        );
    }
}
