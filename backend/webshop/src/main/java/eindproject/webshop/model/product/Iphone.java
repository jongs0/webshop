package eindproject.webshop.model.product;

import eindproject.webshop.model.enums.iphone.*;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("iphone")
public class Iphone extends Product {

    private IphoneColor iphoneColor;
    private IphoneGeneration iphoneGeneration;
    private IphoneStorage iphoneStorage;
    private IphoneNetworkType iphoneNetworkType;
    private IphoneSimType iphoneSimType;

    public IphoneColor getColor() {
        return iphoneColor;
    }

    public void setColor(IphoneColor iphoneColor) {
        this.iphoneColor = iphoneColor;
    }

    public IphoneGeneration getGeneration() {
        return iphoneGeneration;
    }

    public void setGeneration(IphoneGeneration iphoneGeneration) {
        this.iphoneGeneration = iphoneGeneration;
    }

    public IphoneStorage getStorage() {
        return iphoneStorage;
    }

    public void setStorage(IphoneStorage iphoneStorage) {
        this.iphoneStorage = iphoneStorage;
    }

    public IphoneNetworkType getNetworkType() {
        return iphoneNetworkType;
    }

    public void setNetworkType(IphoneNetworkType iphoneNetworkType) {
        this.iphoneNetworkType = iphoneNetworkType;
    }

    public IphoneSimType getSimType() {
        return iphoneSimType;
    }

    public void setSimType(IphoneSimType iphoneSimType) {
        this.iphoneSimType = iphoneSimType;
    }
}
