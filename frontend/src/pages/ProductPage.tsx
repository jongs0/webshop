import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductDetailComponent from "../components/product/ProductDetailComponent";
import ProductVariantSelectorComponent from "../components/product/ProductVariantSelectorComponent";
import AddToCartComponent from "../components/product/AddToCartComponent";
import getCategoryEndPoint from "../components/product/config/categoryEndPointHelper";

const ProductPage = () => {
  const { category, variant } = useParams();
  const normalizedCategory = category?.toLowerCase();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    if (!normalizedCategory || !variant) return;

    fetch(`http://localhost:8080/${getCategoryEndPoint(normalizedCategory)}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((product: any) => {
          switch (normalizedCategory) {
            case "iphone":
              return product.iphoneGeneration === variant;
            case "ipad":
              return product.ipadGeneration === variant;
            case "macbook":
              return product.macbookChipType === variant;
            case "iwatch":
              return String(product.releaseYear) === variant;
            default:
              return false;
          }
        });

        const productsWithImages = filtered.map((product: any) => {
          const categoryKey = normalizedCategory?.toUpperCase();
          const key = `product_images_${categoryKey}_${product.id}`;
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const imageUrls = JSON.parse(stored);
              return { ...product, imageUrls, category: categoryKey };
            } catch {
              return { ...product, category: categoryKey };
            }
          }
          return { ...product, category: categoryKey };
        });

        setProducts(productsWithImages);

        setSelectedProduct(null);
      });
  }, [normalizedCategory, variant]);

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 16px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "32px",
      }}
    >
      <ProductDetailComponent
        product={selectedProduct ?? products[0]}
      />

      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {normalizedCategory && (
          <ProductVariantSelectorComponent
            category={normalizedCategory}
            products={products}
            selectedProduct={selectedProduct}
            onChange={setSelectedProduct}
          />
        )}

        {selectedProduct ? (
          <AddToCartComponent product={selectedProduct} />
        ) : (
          <p style={{ fontSize: "14px", opacity: 0.7 }}>
            Please select options to see availability.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
