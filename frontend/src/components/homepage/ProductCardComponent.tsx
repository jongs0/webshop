import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryProductCard from "../category/CategoryProductCard";

interface ProductCardProps {
  queryKey: string[];
  endpoint: string;
  title?: string;
}

const ProductCardComponent = ({ queryKey, endpoint, title}: ProductCardProps) => {
  const { data: products, isLoading, error } = useQuery<any[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bestsellers");
      }
      return response.json();
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>;
  if (!products || products.length === 0) return <p>Producten niet gevonden...</p>;

  return (
    <div className="container">
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={6} lg={3}>
            <CategoryProductCard
              product={product}
              category={product.category?.toLowerCase() || ""}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductCardComponent;