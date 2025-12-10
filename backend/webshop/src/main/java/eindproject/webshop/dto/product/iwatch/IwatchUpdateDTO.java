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
        CaseColor caseColor,
        BandColor bandColor,
        Connectivity connectivity,
        BandType bandType

) {

    public void updateIwatch(Iwatch iwatch) {

        iwatch.setName(this.name);
        iwatch.setDescription(this.description);
        iwatch.setPrice(this.price);
        iwatch.setStock(this.stock);
        iwatch.setState(this.state);
        iwatch.setModel(this.model);

        iwatch.setReleaseYear(this.releaseYear);
        iwatch.setCaseColor(this.caseColor);
        iwatch.setBandColor(this.bandColor);
        iwatch.setConnectivity(this.connectivity);
        iwatch.setBandType(this.bandType);
    }
}
