    package eindproject.webshop.model.enums.macbook;

    public enum MacbookRamSize {
        GB_8("8GB"),
        GB_16("16GB"),
        GB_24("24GB");

        private final String label;

        MacbookRamSize(String label) { this.label = label; }

        public String getLabel() { return label; }
    }
