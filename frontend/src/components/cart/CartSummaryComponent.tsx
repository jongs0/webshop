import { useState } from "react";
import { Button } from "react-bootstrap";
import { API_URL } from "../../App";
import type { CartDTO, PaymentMethod } from "../../types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    totalPrice: number;
    cart: CartDTO;
    paymentMethod: PaymentMethod;
};

const CartSummaryComponent = ({ totalPrice, cart, paymentMethod }: Props) => {

    // const user = currentUser();
    // ### Temp fix for dysfunctional user store functionality:
    let user = { email: "admin@webshop.com", id: 1, password: "admin123" };

    const queryClient = useQueryClient();

    const onCheckout = useMutation({
        mutationFn: async (paymentMethod: string) => {

            const res = await fetch(
                `${API_URL}/${user.id}/checkout?paymentMethod=${paymentMethod}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            if (!res.ok) throw new Error("Checkout failed");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart", user.id] })
        }
    });

    return (
        <>
            {cart.cartProductDTOs.map((product) => (
                <div key={product.productId}>
                    <p><strong>{product.name}</strong> (quantity: {product.quantity}) €{product.price}</p>
                </div>
            ))}

            <p><strong>Total</strong> €{totalPrice}</p>

            <Button onClick={() => onCheckout.mutate(paymentMethod)}>Pay now</Button>
        </>
    );
};

export default CartSummaryComponent;
