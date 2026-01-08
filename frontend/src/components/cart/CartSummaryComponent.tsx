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
};

const CartSummaryComponent = ({ totalPrice, cart }: Props) => {

    const user = currentUser();
    // ### Temp fix for dysfunctional user store functionality:
    // let user = { email: "admin@webshop.com", id: 1, password: "admin123" };

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    return (
        <>
            <h3>Summary</h3>
            <br />
            {cart.cartProductDTOs.map((product) => (
                <div key={product.productId}>
                    <p><strong>{product.name}</strong> (quantity: {product.quantity}) €{(product.price * product.quantity).toFixed(2)}</p>
                </div>
            ))}

            <p style={{ border: "1px solid gray", borderRadius: "5px" }}><strong>Total</strong> €{totalPrice.toFixed(2)}</p>
        </>
    );
};

export default CartSummaryComponent;
