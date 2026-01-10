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
    console.log(delta)
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
      console.log('Debug: key:')
      console.log(key)
      const stored = localStorage.getItem(key);
      console.log('Debug: stored:')
      console.log(stored)
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
  console.log("Debug")
  console.log("image URLs:")
  console.log(imageUrls)
  console.log("main image (index 0):")
  console.log(mainImage)

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <p><strong>{product.name}</strong></p>
            <img
              src={mainImage}
              alt={product.name}
              style={{
                maxWidth: "600px",
                height: "100px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <br />
            <button
              onClick={() => onDelete.mutate()}
            >
              Delete
            </button>
          </Col>
          <Col>
            <p><strong>Price:</strong> €{product.price.toFixed(2)}</p>
            {/* Quantity selector */}
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
