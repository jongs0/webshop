
import type { CartDTO } from "../types/models.js";
import { currentUser } from "../stores/UserStore.ts";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App.js";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CartItemComponent from "../components/cart/CartItemComponent.tsx";
import CartSummaryComponent from "../components/cart/CartSummaryComponent.tsx";
import PaymentMethodDropdownComponent from "../components/cart/PaymentMethodDropdownComponent.tsx";
import type { PaymentMethod } from "../types/models";
import { useState } from "react";

let paymentMethods: PaymentMethod[];
paymentMethods = ["IDEAL", "CREDITCARD", "PAYPAL"];

const CartPage = () => {

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("IDEAL");

    const queryClient = useQueryClient();

    // const user = currentUser();
    // ### Temp fix for dysfunctional user store functionality:
    let user = { email: "admin@webshop.com", id: 1, password: "admin123" };

    const navigate = useNavigate();

    const { data: cartData, isLoading, error } = useQuery<CartDTO>({
        queryKey: ["cart", user.id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/cart/${user.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${btoa(`${user.email}:${user.password}`)}`
                    }
                }
            );
            if (!res.ok) throw new Error("Failed to load task");
            return await res.json();
        }
    });

    const calcTotalPrice = (cart: CartDTO) => {
        let total = 0;
        cart.cartProductDTOs.forEach(product => {
            total += product.price * product.quantity;
        });
        return total;
    }

    if (isLoading) return <div>Loading cart...</div>;
    if (error) return <div style={{ color: "red" }}>Error loading cart.</div>;
    if (!cartData) return <div></div>;

    return (
        <>
            {cartData.cartProductDTOs.sort((a, b) => a.name.localeCompare(b.name)).map((product) => (
                <div key={product.productId}>
                    <CartItemComponent key={product.productId} product={product} />
                </div>
            ))}

            <CartSummaryComponent totalPrice={calcTotalPrice(cartData)} cart={cartData} paymentMethod={paymentMethod} />

            <PaymentMethodDropdownComponent paymentMethods={paymentMethods} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </>
    )


}

export default CartPage