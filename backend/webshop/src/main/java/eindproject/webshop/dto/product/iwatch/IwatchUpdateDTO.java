package eindproject.webshop.dto.product.iwatch;

import eindproject.webshop.model.enums.iwatch.*;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Iwatch;

public record IwatchUpdateDTO(

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

    public void updateIwatch(Iwatch iwatch) {

        iwatch.setName(this.name);
        iwatch.setDescription(this.description);
        iwatch.setPrice(this.price);
        iwatch.setStock(this.stock);
        iwatch.setState(this.state);
        iwatch.setModel(this.model);

        iwatch.setReleaseYear(this.releaseYear);
        iwatch.setCaseColor(this.iwatchCaseColor);
        iwatch.setBandColor(this.iwatchBandColor);
        iwatch.setConnectivity(this.iwatchConnectivity);
        iwatch.setBandType(this.iwatchBandType);
    }
}
