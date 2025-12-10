package eindproject.webshop.dto.product.iwatch;

import eindproject.webshop.model.enums.iwatch.*;
import eindproject.webshop.model.enums.product.State;
import eindproject.webshop.model.product.Iwatch;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IwatchCreateDTO(

        @NotBlank
        String name,

        @NotBlank
        String description,

        @NotNull
        Double price,

        @NotNull
        Integer stock,

        @NotNull
        State state,

        @NotBlank
        String model,

        @NotNull
        Integer releaseYear,

        @NotNull
        CaseColor caseColor,

        @NotNull
        BandColor bandColor,

        @NotNull
        Connectivity connectivity,

        @NotNull
        BandType bandType

) {

    public Iwatch toEntity() {
        Iwatch iwatch = new Iwatch();

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

        return iwatch;
    }
}
