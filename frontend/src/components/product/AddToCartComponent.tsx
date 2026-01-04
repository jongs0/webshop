import { useState } from "react";
import type { ProductDTO } from "../../types/models";
import { currentUser } from "../../stores/UserStore";
import { API_URL } from "../../App";

type Props = {
  product: ProductDTO;
};

const AddToCartComponent = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const user = currentUser();
  const [error, setError] = useState<string | null>(null);
  
  
  const addToCart = () => {
    if (!user.id || Number.isNaN(user.id)) {
      setError("You must be logged in to add items to your cart");
      return;
    }
    
    setError(null);
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (user.email === "admin@webshop.com") {
      headers.Authorization = `Basic ${btoa("admin@webshop.com:admin123")}`;
    }
    
    fetch(
      `${API_URL}/cart/${user.id}/add/${product.id}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          quantity: quantity,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication required. Please log in again.");
          }
          throw new Error("Failed to add to cart");
        }
        return response.json();
      })
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message || "Failed to add item to cart");
      });
  };
  
  return (
    <section>
    {product && (
      <>
      <p><strong>Price:</strong> €{product.price}</p>
      <p><strong>In stock:</strong> {product.stock}</p>
      </>
    )}
    
    <button
    className="btn btn-primary"
    onClick={addToCart}
    disabled={product.stock === 0}
    style={{ height: "40px" }}
    >
    Add to cart
    </button>
    
    {error && (
      <p style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>
      {error}
      </p>
    )}
    </section>
  );
};

export default AddToCartComponent;
