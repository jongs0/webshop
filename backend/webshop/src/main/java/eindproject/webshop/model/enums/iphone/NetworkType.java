package eindproject.webshop.model.enums.iphone;

public enum NetworkType {

    NETWORK_TYPE_4G("4G"),
    NETWORK_TYPE_5G("5G");

    private final String label;

    NetworkType(String label) { this.label = label; }

    public String getLabel() { return label; }
}
