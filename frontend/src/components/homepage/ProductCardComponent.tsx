import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { getProductCategoryImage } from "./ProductImageCategoryHelper";
import { Link } from "react-router";

interface ProductCardProps {
  queryKey: string[];
  endpoint: string;
  title?: string;
}

const ProductCardComponent = ({ queryKey, endpoint, title}: ProductCardProps) => {
  const { data: products, isLoading, error } = useQuery<ProductDTO[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bestsellers");
      }
      return response.json();
    },
  });

  // Loading / error guards
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {(error as Error).message}</p>;
  if (!products || products.length === 0) return <p>Producten niet gevonden...</p>;

  return (
    <div className="container bestseller">
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={6} lg={3}>
            <Card className="h-100">
                <Link
                    to={`/products/${product.id}`}
                    className="text-decoration-none text-dark"
                >
              <Card.Img
                variant="top"
                src={getProductCategoryImage(product.category)}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>€{product.price}</Card.Text>
              </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductCardComponent;