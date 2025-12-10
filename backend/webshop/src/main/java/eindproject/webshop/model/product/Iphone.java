package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.iphone.*;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("iphone")
public class Iphone extends Product {

    Color color;
    Generation generation;
    Storage storage;
    NetworkType networkType;
    SimType simType;

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

    public NetworkType getNetworkType() {
        return networkType;
    }

    public void setNetworkType(NetworkType networkType) {
        this.networkType = networkType;
    }

    public SimType getSimType() {
        return simType;
    }

    public void setSimType(SimType simType) {
        this.simType = simType;
    }
}
