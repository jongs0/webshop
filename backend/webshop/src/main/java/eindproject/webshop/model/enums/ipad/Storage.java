package eindproject.webshop.model.enums.ipad;

public enum Storage {
    GB_64("64GB"),
    GB_128("128GB"),
    GB_256("256GB");

private final String label;

Storage(String label) { this.label = label; }

public String getLabel() { return label; }
}
