import { useState } from "react";
import type { CartProductDTO, ProductDTO } from "../../types/models";
import { Button } from "react-bootstrap";
import { API_URL } from "../../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  product: CartProductDTO;
};

const CartItemComponent = ({ product }: Props) => {
  const [quantityState, setQuantity] = useState(product.quantity);

  const queryClient = useQueryClient();

  // const user = currentUser();
  // ### Temp fix for dysfunctional user store functionality:
  let user = { email: "admin@webshop.com", id: 1, password: "admin123" };

  const onQuantityChange = useMutation({
    mutationFn: async (quantity: number) => {
      let endpointType = '';

      switch (quantity) {
        case quantityState + 1:
          endpointType = 'increase';
          break;
        case quantityState - 1:
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

  const handleChange = (quantity: number) => {
    setQuantity(quantity)
    onQuantityChange.mutate(quantity)
    console.log(quantity)
  }

  const onDelete = useMutation({
    mutationFn: async () => {
      await fetch(
        `${API_URL}/cart/${user.id}/clear`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user.id] });
    }
  });

  return (
    <section>
      {/* Image */}
      <p><strong>€{product.name}</strong></p>
      <p><strong>Price:</strong> €{product.price}</p>
      {/* Quantity selector (+-) */}
      <Button onClick={() => { handleChange(quantityState + 1) }}>+</Button>
      {quantityState}
      <Button onClick={() => { handleChange(quantityState - 1) }}>-</Button>

      <br />

      <button
        onClick={() => onDelete.mutate()}
      >
        Delete
      </button>
    </section>
  );
};

export default CartItemComponent;
