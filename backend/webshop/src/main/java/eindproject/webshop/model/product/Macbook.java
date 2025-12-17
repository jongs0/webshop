package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.macbook.MacbookChipType;
import eindproject.webshop.model.enums.macbook.MacbookColor;
import eindproject.webshop.model.enums.macbook.MacbookRamSize;
import eindproject.webshop.model.enums.macbook.MacbookStorage;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("macbook")
public class Macbook extends Product {

    private Integer releaseYear;
    private MacbookChipType macbookChipType;
    private MacbookRamSize macbookRamSize;
    private MacbookStorage macbookStorage;
    private MacbookColor macbookColor;

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public MacbookChipType getChipType() {
        return macbookChipType;
    }

    public void setChipType(MacbookChipType macbookChipType) {
        this.macbookChipType = macbookChipType;
    }

    public MacbookRamSize getRamSize() {
        return macbookRamSize;
    }

    public void setRamSize(MacbookRamSize macbookRamSize) {
        this.macbookRamSize = macbookRamSize;
    }

    public MacbookStorage getStorage() {
        return macbookStorage;
    }

    public void setStorage(MacbookStorage macbookStorage) {
        this.macbookStorage = macbookStorage;
    }

    public MacbookColor getColor() {
        return macbookColor;
    }

    public void setColor(MacbookColor macbookColor) {
        this.macbookColor = macbookColor;
    }

}
