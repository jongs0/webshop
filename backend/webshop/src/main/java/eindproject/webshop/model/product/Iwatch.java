package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.iwatch.Connectivity;
import eindproject.webshop.model.enums.iwatch.BandColor;
import eindproject.webshop.model.enums.iwatch.BandType;
import eindproject.webshop.model.enums.iwatch.CaseColor;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("iwatch")
public class Iwatch extends Product {

    private Integer releaseYear;
    private CaseColor caseColor;
    private BandColor bandColor;
    private Connectivity connectivity;
    private BandType bandType;

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public CaseColor getCaseColor() {
        return caseColor;
    }

    public void setCaseColor(CaseColor caseColor) {
        this.caseColor = caseColor;
    }

    public BandColor getBandColor() {
        return bandColor;
    }

    public void setBandColor(BandColor bandColor) {
        this.bandColor = bandColor;
    }

    public Connectivity getConnectivity() {
        return connectivity;
    }

    public void setConnectivity(Connectivity connectivity) {
        this.connectivity = connectivity;
    }

    public BandType getBandType() {
        return bandType;
    }

    public void setBandType(BandType bandType) {
        this.bandType = bandType;
    }

}
