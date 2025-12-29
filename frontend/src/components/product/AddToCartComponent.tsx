import { useState } from "react";
import type { ProductDTO } from "../../types/models";
import { currentUser } from "../../stores/UserStore";


type Props = {
  product: ProductDTO;
};

const AddToCartComponent = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const user = currentUser();


  const addToCart = () => {

    if (!user.id || Number.isNaN(user.id)) {
      alert("Please log in first");
      return;
    }
    
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

      <br />

      <button
        onClick={addToCart}
        disabled={product.stock === 0}
      >
        Add to cart
      </button>
    </section>
  );
};

export default AddToCartComponent;
