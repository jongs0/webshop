package eindproject.webshop.model.enums.iphone;

public enum IphoneGeneration {

        GEN_13("13"),
        GEN_14("14"),
        GEN_15("15"),
        GEN_16("16"),
        GEN_17("17");

        private final String label;

        IphoneGeneration(String label) { this.label = label; }

        public String getLabel() { return label; }
    }
