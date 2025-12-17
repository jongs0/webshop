package eindproject.webshop.model.enums.macbook;

public enum MacbookStorage {
    GB_128("128GB"),
    GB_256("256GB"),
    GB_512("512GB"),
    GB_1024("1024GB");

    private final String label;

    MacbookStorage(String label) { this.label = label; }

    public String getLabel() { return label; }
}
