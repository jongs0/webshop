import { useState } from "react";
import type { ProductDTO, Category } from "../../types/models"


const ProductDetailComponent = ({ product }: { product: ProductDTO & { category?: Category }}) => {
  const getImageUrls = (): string[] => {
    if (product.id && product.category) {
      const key = `product_images_${product.category}_${product.id}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return parsed.filter(url => url && url.trim() !== "");
          }
        } catch {
          return [];
        }
      }
    }
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
    if ((product as any).imageUrl) {
      return [(product as any).imageUrl];
    }
    return [];
  };

  const imageUrls = getImageUrls();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const mainImage = imageUrls[selectedImageIndex] || imageUrls[0];

  return ( 
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {imageUrls.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "16px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${product.name} view ${index + 1}`}
                onClick={() => setSelectedImageIndex(index)}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: selectedImageIndex === index ? "2px solid #007bff" : "1px solid #ddd",
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  transition: "border-color 0.2s",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "600" }}>{product.name}</h1>
              <p style={{ margin: "0 0 12px 0", fontSize: "0.875rem", color: "#666", lineHeight: "1.5" }}>{product.description}</p>
            </div>
            {mainImage && (
              <img 
                src={mainImage} 
                alt={product.name}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  maxHeight: "600px",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
        </div>
      )}
      {imageUrls.length === 0 && (
        <div>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "600", textAlign: "center" }}>{product.name}</h1>
          <p style={{ margin: 0, fontSize: "16px", color: "#666", lineHeight: "1.6", textAlign: "center" }}>{product.description}</p>
        </div>
      )}
    </div>
  )

}

export default ProductDetailComponent