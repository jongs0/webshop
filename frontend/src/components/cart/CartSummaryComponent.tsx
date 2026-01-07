import { useState } from "react";
import { Button } from "react-bootstrap";
import { API_URL } from "../../App";
import type { CartDTO, OrderDTO, PaymentMethod } from "../../types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currentUser } from "../../stores/UserStore";
import { useNavigate } from "react-router";

type Props = {
    totalPrice: number;
    cart: CartDTO;
    paymentMethod: PaymentMethod;
};

const CartSummaryComponent = ({ totalPrice, cart, paymentMethod }: Props) => {

    const user = currentUser();
    // ### Temp fix for dysfunctional user store functionality:
    // let user = { email: "admin@webshop.com", id: 1, password: "admin123" };

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const onCheckout = useMutation({
        mutationFn: async (paymentMethod: string) => {

            const res = await fetch(
                `${API_URL}/cart/${user.id}/checkout?paymentMethod=${paymentMethod}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': user.authHeader
                    }
                }
            );
            if (!res.ok) throw new Error("Checkout failed");
            return res.json();
        },
        onSuccess: (order: OrderDTO) => {
            queryClient.invalidateQueries({ queryKey: ["cart", user.id] })
            navigate(`/checkout/${order.id}`)
        }
    });

    return (
        <>
            {cart.cartProductDTOs.map((product) => (
                <div key={product.productId}>
                    <p><strong>{product.name}</strong> (quantity: {product.quantity}) €{(product.price * product.quantity).toFixed(2)}</p>
                </div>
            ))}

            <p><strong>Total</strong> €{totalPrice.toFixed(2)}</p>

            <Button onClick={() => onCheckout.mutate(paymentMethod)}>Pay now</Button>
        </>
    );
};

export default CartSummaryComponent;
