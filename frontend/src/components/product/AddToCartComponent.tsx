import { useState } from "react";
import type { ProductDTO } from "../../types/models";
import { currentUser } from "../../stores/UserStore";


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
    
    fetch(
      `http://localhost:8080/cart/${userId}/add/${product.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
      }
    );
  };

  return (
    <section>
      <p><strong>Price:</strong> €{product.price}</p>
      <p><strong>In stock:</strong> {product.stock}</p>

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
