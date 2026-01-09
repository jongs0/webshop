
import type { CartDTO, OrderDTO } from "../types/models.js";
import { currentUser } from "../stores/UserStore.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "../App.js";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CartItemComponent from "../components/cart/CartItemComponent.tsx";
import CartSummaryComponent from "../components/cart/CartSummaryComponent.tsx";
import PaymentMethodDropdownComponent from "../components/cart/PaymentMethodDropdownComponent.tsx";
import type { PaymentMethod } from "../types/models";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

let paymentMethods: PaymentMethod[];
paymentMethods = ["IDEAL", "CREDITCARD", "PAYPAL"];

const CartPage = () => {

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("IDEAL");

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const user = currentUser();

    const { data: cartData, isLoading, error } = useQuery<CartDTO>({
        queryKey: ["cart", user.id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/cart/${user.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': user.authHeader
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

    if (isLoading) return <div>Loading cart...</div>;
    if (error) return <div style={{ color: "red" }}>Error loading cart.</div>;
    if (!cartData) return <div></div>;

    return (
        <>
            {cartData.cartProductDTOs.length > 0 ?
                <>
                    <Container>
                        <Row>
                            <Col>
                                {cartData.cartProductDTOs.sort((a, b) => (a.name.localeCompare(b.name) != 0 ? a.name.localeCompare(b.name) : (a.productId - b.productId))).map((product) => (
                                    <div key={product.productId} style={{ border: "1px solid gray", margin: "10px" }}>
                                        <CartItemComponent key={product.productId} product={product} />
                                    </div>
                                ))}
                            </Col>
                            <Col xs={4}>
                                <div style={{ margin: "10px" }}>
                                    <div style={{ border: "1px solid gray", borderRadius: "10px" }}>
                                        <CartSummaryComponent totalPrice={calcTotalPrice(cartData)} cart={cartData} />
                                    </div>
                                    <br />
                                    Payment method
                                    <br />
                                    <br />
                                    <PaymentMethodDropdownComponent paymentMethods={paymentMethods} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                                    <br />
                                    <Button onClick={() => onCheckout.mutate(paymentMethod)}>Pay now</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                </>
                :
                <p>Cart is empty</p>
            }
            <div>
                <p>
                    Verder winkelen? <Button onClick={() => navigate("/")}>Terug naar winkel</Button>
                </p>
            </div>
            <br />
        </>
    )


}

export default CartPage