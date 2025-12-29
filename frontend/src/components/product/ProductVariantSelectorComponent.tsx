import { useState, useMemo } from "react";
import type { Category } from "../../types/models";
import { PRODUCT_OPTIONS } from "./config/ProductOptions";
import { VARIANT_ENUMS } from "./config/VariantEnums";
import enumToOptions from "./config/enumToOptions";

type Props = {
  category: string;
  products: any[];
  selectedProduct: any;
  onChange: (product: any) => void;
};

const DROPDOWN_WIDTH = "220px";

const ProductVariantSelectorComponent = ({
  category,
  products,
  selectedProduct,
  onChange,
}: Props) => {
  const cat = category.toUpperCase() as Category;

  const fields = PRODUCT_OPTIONS[cat];
  const enumConfig = VARIANT_ENUMS[cat];

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  if (!fields || !enumConfig || products.length === 0) return null;

  const formatValueLabel = (value: string) => {
    if (value.startsWith("GB_")) {
      return value.replace("GB_", "") + " GB";
    }

    return value
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      Object.entries(selectedValues).every(
        ([field, value]) => product[field] === value
      )
    );
  }, [products, selectedValues]);

  const getOptionsForField = (field: string) => {
    const allValues = enumConfig[field] ?? [];

    return enumToOptions(allValues).map((option) => {
      const stillValid = products.some((product) =>
        Object.entries({
          ...selectedValues,
          [field]: option.value,
        }).every(([f, v]) => product[f] === v)
      );

      return {
        value: option.value,
        label: formatValueLabel(option.value),
        disabled: !stillValid,
        outOfStock: !stillValid,
      };
    });
  };

  const handleSelect = (field: string, value: string) => {
    const next = {
      ...selectedValues,
      [field]: value,
    };

    setSelectedValues(next);

    const match = products.find((product) =>
      Object.entries(next).every(([f, v]) => product[f] === v)
    );

    if (match) {
      onChange(match);
    }
  };

  const formatFieldLabel = (field: string) =>
    field
      .replace(/^(iphone|ipad|iwatch|macbook)/, "")
      .replace(/([A-Z])/g, " $1")
      .trim();

  return (
    <section className="d-flex flex-column align-items-center gap-3">
      {fields.map((field) => (
        <div key={field} className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle text-white fw-normal"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: DROPDOWN_WIDTH }}
          >
            {selectedValues[field]
              ? formatValueLabel(selectedValues[field])
              : formatFieldLabel(field)}
          </button>

          <ul
            className="dropdown-menu dropdown-menu-dark"
            style={{ width: DROPDOWN_WIDTH }}
          >
            {getOptionsForField(field).map((option) => (
              <li key={option.value}>
                <button
                  className={`dropdown-item text-white fw-normal d-flex flex-column ${
                    selectedValues[field] === option.value ? "active" : ""
                  }`}
                  disabled={option.disabled}
                  onClick={() => handleSelect(field, option.value)}
                >
                  <span>{option.label}</span>

                  {option.outOfStock && (
                    <small className="text-danger">
                      Out of stock
                    </small>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default ProductVariantSelectorComponent;
