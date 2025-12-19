import type { Category } from "../../types/models";
import { PRODUCT_OPTIONS } from "./config/ProductOptions";
import enumToOptions from "./config/enumToOptions";

type Props = {
  category: string;
  products: any[];
  selectedProduct: any;
  onChange: (product: any) => void;
};

const ProductVariantSelectorComponent = ({
  category,
  products,
  selectedProduct,
  onChange,
}: Props) => {

  const fields =
    PRODUCT_OPTIONS[category.toUpperCase() as Category];

  if (!fields || !products || products.length === 0) {
    return null;
  }

  const getValuesForField = (field: string) => {
    const values: string[] = [];

    for (const product of products) {
      const value = product[field];
      if (value && !values.includes(value)) {
        values.push(value);
      }
    }

    return enumToOptions(values);
  };

  const handleClick = (field: string, value: string) => {
    const match = products.find(
      (product) => product[field] === value
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
    <section>
      {fields.map((field) => (
        <div key={field} className="dropdown mb-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {formatFieldLabel(field)}
          </button>

          <ul className="dropdown-menu">
            {getValuesForField(field).map((option) => (
              <li key={option.value}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(field, option.value);
                  }}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default ProductVariantSelectorComponent;
