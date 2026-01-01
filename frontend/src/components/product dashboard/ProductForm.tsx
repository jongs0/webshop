import type { Category } from "../../../types/models";
import { productFields } from "./config/productFields";
import { getEnumLabel } from "./config/productLabels";

interface ProductFormProps {
  category: Category;
  product: Record<string, any>;
  onChange: (key: string, value: any) => void;
  disabled?: boolean;
}

const ProductForm = ({ category, product, onChange, disabled = false }: ProductFormProps) => {
  const fields = productFields[category];

  const handleChange = (key: string, value: any) => {
    onChange(key, value);
  };

  const renderField = (field: typeof fields[0]) => {
    const value = product[field.key] ?? "";
    const fieldId = `field-${field.key}`;

    switch (field.type) {
      case "text":
        return (
          <input
            id={fieldId}
            type="text"
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            disabled={disabled}
            required={field.required}
            placeholder={field.placeholder}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          />
        );

      case "number":
        return (
          <input
            id={fieldId}
            type="number"
            value={value === 0 ? 0 : value || ""}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === "") {
                handleChange(field.key, "");
              } else {
                const numValue = Number(inputValue);
                if (!isNaN(numValue)) {
                  handleChange(field.key, numValue);
                }
              }
            }}
            disabled={disabled}
            required={field.required}
            placeholder={field.placeholder}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          />
        );

      case "textarea":
        const displayValue = field.key === "imageUrls" && Array.isArray(value)
          ? value.join("\n")
          : field.key === "imageUrls" && typeof value === "string" && value.includes("[")
          ? JSON.parse(value).join("\n")
          : value;
        return (
          <textarea
            id={fieldId}
            value={displayValue}
            onChange={(e) => {
              if (field.key === "imageUrls") {
                const lines = e.target.value.split("\n").filter(line => line.trim() !== "");
                handleChange(field.key, lines);
              } else {
                handleChange(field.key, e.target.value);
              }
            }}
            disabled={disabled}
            required={field.required}
            placeholder={field.placeholder}
            rows={field.key === "imageUrls" ? 6 : 4}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              fontFamily: "inherit",
              resize: "vertical",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          />
        );

      case "enum":
        if (!field.enumValues) return null;
        const enumValue = value || "";
        return (
          <select
            id={fieldId}
            value={enumValue}
            onChange={(e) => handleChange(field.key, e.target.value)}
            disabled={disabled}
            required={field.required}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box",
              backgroundColor: disabled ? "#f5f5f5" : "white",
              color: "#000",
            }}
          >
            <option value="" style={{ color: "#000" }}>Select {field.label}</option>
            {field.enumValues.map((enumVal) => (
              <option key={enumVal} value={enumVal} style={{ color: "#000" }}>
                {getEnumLabel(field.key, enumVal)}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {fields.map((field) => (
        <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label
            htmlFor={`field-${field.key}`}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            {field.label}
            {field.required && <span style={{ color: "red", marginLeft: "4px" }}>*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

export default ProductForm;

