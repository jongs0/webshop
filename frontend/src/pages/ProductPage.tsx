import { useEffect, useState } from "react";
import ProductDetailComponent from "../components/product/ProductDetailComponent";
import ProductVariantSelectorComponent from "../components/product/ProductVariantSelectorComponent";
import AddToCartComponent from "../components/product/AddToCartComponent";
import { useParams } from "react-router";

const ProductPage = () => {
  const { category, variant } = useParams();
  const normalizedCategory = category?.toLowerCase();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    if (!normalizedCategory || !variant) return;

    fetch(`http://localhost:8080/${normalizedCategory}`)
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

        setProducts(filtered);
        setSelectedProduct(filtered[0] ?? null);
      });
  }, [normalizedCategory, variant]);

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <>
      <ProductDetailComponent product={selectedProduct} />

      <ProductVariantSelectorComponent
        category={normalizedCategory}
        products={products}
        selectedProduct={selectedProduct}
        onChange={setSelectedProduct}
      />

      <AddToCartComponent product={selectedProduct} />
    </>
  );
};

export default ProductPage;
