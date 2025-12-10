package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.macbook.ChipType;
import eindproject.webshop.model.enums.macbook.Color;
import eindproject.webshop.model.enums.macbook.RamSize;
import eindproject.webshop.model.enums.macbook.Storage;
import eindproject.webshop.model.enums.product.Category;
import eindproject.webshop.model.enums.product.State;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
@DiscriminatorValue("macbook")
public class Macbook extends Product {

    private Integer releaseYear;
    private ChipType chipType;
    private RamSize ramSize;
    private Storage storage;
    private Color color;

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public ChipType getChipType() {
        return chipType;
    }

    public void setChipType(ChipType chipType) {
        this.chipType = chipType;
    }

    public RamSize getRamSize() {
        return ramSize;
    }

    public void setRamSize(RamSize ramSize) {
        this.ramSize = ramSize;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

}
