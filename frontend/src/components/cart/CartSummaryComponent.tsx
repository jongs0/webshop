import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
            <Container style={{ alignItems: "center" }}>
                {cart.cartProductDTOs.map((product) => (
                    <Row key={product.productId}>
                        <Col style={{ textAlign: "left" }}>
                            <p>{product.name} (quantity: {product.quantity})</p>
                        </Col>
                        <Col style={{ textAlign: "right" }} xs="5">
                            €{(product.price * product.quantity).toFixed(2)}
                        </Col>
                    </Row>
                ))}
                <Row style={{ border: "1px solid gray", borderRadius: "5px", alignContent: "center" }}>
                    <Col style={{ textAlign: "left" }}>
                        <p>Total</p>
                    </Col>
                    <Col style={{ textAlign: "right" }} xs="5">
                        €{totalPrice.toFixed(2)}
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default CartSummaryComponent;
