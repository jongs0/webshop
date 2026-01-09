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
    return [];
  };

  const imageUrls = getImageUrls();
  const mainImage = imageUrls[0];
  console.log("Debug")
  console.log("image URLs:")
  console.log(imageUrls)
  console.log("main image (index 0):")
  console.log(mainImage)

  return (
    <div>
      <Container style={{ padding: "20px" }}>
        <Row>
          <Col>
            <div style={{ float: "left" }}>
              <p><h3>{product.name}</h3></p>
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
              <br />
              <Button variant="secondary" size="sm" style={{ color: "white" }}
                onClick={() => onDelete.mutate()}
              >
                Delete
              </Button>
            </div>
          </Col>
          <Col style={{ position: "relative", paddingRight: "10px" }}>
            <div style={{ float: "right" }}>
              <div style={{ fontSize: "18px", backgroundColor: "gray", borderRadius: "5px", color: "white", float: "right", padding: "5px 10px" }}>€{product.price.toFixed(2)}</div>
            </div>
            <br />
            {/* Quantity selector */}
            <div style={{ position: "absolute", bottom: "0px", right: "0px", paddingRight: "10px" }}>
              <button type="button" onClick={() => { handleChange(-1) }} style={{ fontSize: "15px", borderRadius: "50%", border: "1px solid black", height: "35px", width: "35px", textAlign: "center", alignContent: "center", backgroundColor: "white", padding: "0px" }}>-</button>
              &nbsp;{quantityState}&nbsp;
              <button type="button" onClick={() => { handleChange(1) }} style={{ fontSize: "15px", borderRadius: "50%", border: "1px solid black", height: "35px", width: "35px", textAlign: "center", alignContent: "center", backgroundColor: "white", padding: "0px" }}>+</button>
            </div>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default CartItemComponent;
