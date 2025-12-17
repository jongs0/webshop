package eindproject.webshop.model.enums.macbook;

public enum RamSize {
    GB_8("8GB"),
    GB_16("16GB"),
    GB_24("24GB");

    private final String label;

    RamSize(String label) { this.label = label; }

    public String getLabel() { return label; }
}
