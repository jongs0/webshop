package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.ipad.IpadColor;
import eindproject.webshop.model.enums.ipad.IpadConnectivity;
import eindproject.webshop.model.enums.ipad.IpadGeneration;
import eindproject.webshop.model.enums.ipad.IpadStorage;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ipad")
public class Ipad extends Product {

    private IpadColor ipadColor;
    private IpadGeneration ipadGeneration;
    private IpadStorage ipadStorage;
    private IpadConnectivity ipadConnectivity;

    public IpadColor getColor() {
        return ipadColor;
    }

    public void setColor(IpadColor ipadColor) {
        this.ipadColor = ipadColor;
    }

    public IpadGeneration getGeneration() {
        return ipadGeneration;
    }

    public void setGeneration(IpadGeneration ipadGeneration) {
        this.ipadGeneration = ipadGeneration;
    }

    public IpadStorage getStorage() {
        return ipadStorage;
    }

    public void setStorage(IpadStorage ipadStorage) {
        this.ipadStorage = ipadStorage;
    }

    public IpadConnectivity getConnectivity() {
        return ipadConnectivity;
    }

    public void setConnectivity(IpadConnectivity ipadConnectivity) {
        this.ipadConnectivity = ipadConnectivity;
    }
}
