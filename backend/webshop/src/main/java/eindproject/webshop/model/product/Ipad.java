package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.ipad.Color;
import eindproject.webshop.model.enums.ipad.Connectivity;
import eindproject.webshop.model.enums.ipad.Generation;
import eindproject.webshop.model.enums.ipad.Storage;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
@DiscriminatorValue("ipad")
public class Ipad extends Product {

    private Color color;
    private Generation generation;
    private Storage storage;
    private Connectivity connectivity;

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Generation getGeneration() {
        return generation;
    }

    public void setGeneration(Generation generation) {
        this.generation = generation;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public Connectivity getConnectivity() {
        return connectivity;
    }

    public void setConnectivity(Connectivity connectivity) {
        this.connectivity = connectivity;
    }
}
