import type { Category } from "../../types/models";
import ProductForm from "./ProductForm";
import { categoryLabels } from "./config/productLabels";

interface ProductDetailComponentProps {
  category: Category;
  product: Record<string, any>;
  onEdit: () => void;
  onClose: () => void;
}

const ProductDetailComponent = ({
  category,
  product,
  onEdit,
  onClose,
}: ProductDetailComponentProps) => {
  const handleChange = () => {
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
          onClose();
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
            View {categoryLabels[category]}
          </h2>
          <button
            onClick={onClose}
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
            if (Array.isArray(product.imageUrls)) {
              return product.imageUrls.filter(url => url && url.trim() !== "");
            }
            if (typeof product.imageUrls === "string") {
              try {
                const parsed = JSON.parse(product.imageUrls);
                if (Array.isArray(parsed)) {
                  return parsed.filter(url => url && url.trim() !== "");
                }
              } catch {
                const lines = product.imageUrls.split("\n").filter(line => line.trim() !== "");
                return lines;
              }
            }
            if (product.imageUrl) {
              return [product.imageUrl];
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
                  alt={product.name || "Product image"}
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
          <ProductForm category={category} product={product} onChange={handleChange} disabled={true} />
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
            onClick={onEdit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Edit
          </button>
          <button
            onClick={onClose}
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;

