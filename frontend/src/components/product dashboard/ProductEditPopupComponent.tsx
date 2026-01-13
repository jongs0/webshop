import { useState, useEffect } from "react";
import type { Category } from "../../types/models";
import ProductForm from "./ProductForm";
import { categoryLabels } from "./config/productLabels";

interface ProductEditPopupComponentProps {
  category: Category;
  product: Record<string, any>;
  onSave: (product: Record<string, any>) => void;
  onCancel: () => void;
}

const ProductEditPopupComponent = ({
  category,
  product,
  onSave,
  onCancel,
}: ProductEditPopupComponentProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave({ ...formData, category });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
            Edit {categoryLabels[category]}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
              padding: "0",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {(() => {
          const getImageUrls = (): string[] => {
            if (Array.isArray(formData.imageUrls)) {
              return formData.imageUrls.filter(url => url && url.trim() !== "");
            }
            if (typeof formData.imageUrls === "string") {
              try {
                const parsed = JSON.parse(formData.imageUrls);
                if (Array.isArray(parsed)) {
                  return parsed.filter(url => url && url.trim() !== "");
                }
              } catch {
                const lines = formData.imageUrls.split("\n").filter(line => line.trim() !== "");
                return lines;
              }
            }
            if (formData.imageUrl) {
              return [formData.imageUrl];
            }
            return [];
          };
          const imageUrls = getImageUrls();
          const mainImage = imageUrls[0];
          return mainImage && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "12px",
                border: "1px solid #ddd",
                display: "inline-block",
              }}>
                <img 
                  src={mainImage} 
                  alt={formData.name || "Product image"}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "auto",
                    borderRadius: "4px",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          );
        })()}
        <div style={{ marginBottom: "24px" }}>
          <ProductForm category={category} product={formData} onChange={handleChange} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            paddingTop: "16px",
            borderTop: "1px solid #eee",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPopupComponent;

