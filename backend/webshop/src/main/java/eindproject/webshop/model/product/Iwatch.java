package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.iwatch.IwatchConnectivity;
import eindproject.webshop.model.enums.iwatch.IwatchBandColor;
import eindproject.webshop.model.enums.iwatch.IwatchBandType;
import eindproject.webshop.model.enums.iwatch.IwatchCaseColor;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("iwatch")
public class Iwatch extends Product {

    private Integer releaseYear;
    private IwatchCaseColor iwatchCaseColor;
    private IwatchBandColor iwatchBandColor;
    private IwatchConnectivity iwatchConnectivity;
    private IwatchBandType iwatchBandType;

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public IwatchCaseColor getCaseColor() {
        return iwatchCaseColor;
    }

    public void setCaseColor(IwatchCaseColor iwatchCaseColor) {
        this.iwatchCaseColor = iwatchCaseColor;
    }

    public IwatchBandColor getBandColor() {
        return iwatchBandColor;
    }

    public void setBandColor(IwatchBandColor iwatchBandColor) {
        this.iwatchBandColor = iwatchBandColor;
    }

    public IwatchConnectivity getConnectivity() {
        return iwatchConnectivity;
    }

    public void setConnectivity(IwatchConnectivity iwatchConnectivity) {
        this.iwatchConnectivity = iwatchConnectivity;
    }

    public IwatchBandType getBandType() {
        return iwatchBandType;
    }

    public void setBandType(IwatchBandType iwatchBandType) {
        this.iwatchBandType = iwatchBandType;
    }

}
