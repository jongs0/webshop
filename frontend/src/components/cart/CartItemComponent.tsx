import { useState } from "react";
import type { CartProductDTO, ProductDTO } from "../../types/models";
import { Button, Col, Container, Row } from "react-bootstrap";
import { API_URL } from "../../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currentUser } from "../../stores/UserStore";

type Props = {
  product: CartProductDTO;
};

const CartItemComponent = ({ product }: Props) => {
  const [quantityState, setQuantity] = useState(product.quantity);

  const queryClient = useQueryClient();

  const user = currentUser();
  // ### Temp fix for dysfunctional user store functionality:
  // let user = { email: "admin@webshop.com", id: 1, password: "admin123" };

  const onQuantityChange = useMutation({
    mutationFn: async (delta: number) => {

      let endpointType = '';

      switch (delta) {
        case 1:
          endpointType = 'increase';
          break;
        case -1:
          endpointType = 'decrease';
          break;
        default:
          return;
      }

      const res = await fetch(
        `${API_URL}/cart/${user.id}/${endpointType}/${product.productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': user.authHeader
          }
        }
      );
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user.id] })
    }
  });

  const handleChange = (delta: number) => {
    if (quantityState + delta < 0)
      return;
    onQuantityChange.mutate(delta)
    setQuantity(quantityState + delta)
  }

  const onDelete = useMutation({
    mutationFn: async () => {
      await fetch(
        `${API_URL}/cart/${user.id}/remove/${product.productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization': user.authHeader
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user.id] });
    }
  });

  const getImageUrls = (): string[] => {
    if (product.productId) {
      const key = `product_images_${product.productId}`
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
  const mainImage = imageUrls[0];

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <p><strong>{product.name}</strong></p>
            <div
              style={{
                display: "inline-block",
                position: "relative",
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  style={{
                    maxWidth: "600px",
                    height: "100px",
                    borderRadius: "4px",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              {isHovering && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete.mutate();
                  }}
                  style={{
                    position: "absolute",
                    bottom: "-32px",
                    left: "8px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#c82333";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#dc3545";
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </Col>
          <Col>
            <p><strong>Price:</strong> €{product.price.toFixed(2)}</p>
            <Button onClick={() => { handleChange(-1) }}>-</Button>
            &nbsp;{quantityState}&nbsp;
            <Button onClick={() => { handleChange(1) }}>+</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartItemComponent;
