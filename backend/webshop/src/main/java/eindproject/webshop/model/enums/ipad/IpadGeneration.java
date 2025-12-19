package eindproject.webshop.model.enums.ipad;

public enum IpadGeneration {
    GEN_6("6"),
    GEN_7("7"),
    GEN_8("8"),
    GEN_9("9"),
    GEN_10("10");

    private final String label;

    IpadGeneration(String label) { this.label = label; }

    public String getLabel() { return label; }
}
