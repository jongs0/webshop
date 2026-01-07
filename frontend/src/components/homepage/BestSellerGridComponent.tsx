import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../App";
import CategoryProductCard from "../category/CategoryProductCard";

const getCategoryEndpoint = (category: string): string => {
  switch (category.toLowerCase()) {
    case "iphone":
      return "iphone";
    case "macbook":
      return "macbook";
    case "ipad":
      return "ipad";
    case "iwatch":
      return "iwatch";
    default:
      return "";
  }
};

const BestSellerGridComponent = () => {
  const { data: bestsellers = [], isLoading, isError } = useQuery({
    queryKey: ["bestsellers"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/bestsellers`);
      if (!response.ok) {
        throw new Error("Failed to fetch bestsellers");
      }
      const bestsellerList = await response.json();
      
      const enrichedProducts = await Promise.all(
        bestsellerList.map(async (product: any) => {
          const category = product.category?.toLowerCase() || "";
          if (!category || !product.id) return product;
          
          const endpoint = getCategoryEndpoint(category);
          if (!endpoint) return product;
          
          try {
            const detailResponse = await fetch(`${API_URL}/${endpoint}/${product.id}`);
            if (detailResponse.ok) {
              const fullProduct = await detailResponse.json();
              return { ...fullProduct, category: product.category };
            }
          } catch (error) {
            console.error(`Failed to fetch details for product ${product.id}:`, error);
          }
          
          return product;
        })
      );
      
      return enrichedProducts;
    },
  });

  if (isLoading) return <p>Loading bestsellers...</p>;
  if (isError) return <p style={{ color: "red" }}>Error loading bestsellers</p>;
  if (!bestsellers || bestsellers.length === 0) return null;

  return (
    <div className="container bestseller" style={{ marginBottom: "3rem" }}>
      <h2 
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#212529",
          letterSpacing: "-0.02em",
        }}
      >
        Our bestsellers
      </h2>
      <div className="row g-4">
        {bestsellers.map((product: any) => {
          const category = product.category?.toLowerCase() || "";
          if (!category) return null;
          
          return (
            <div key={product.id} className="col-md-3">
              <CategoryProductCard
                product={product}
                category={category}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSellerGridComponent;