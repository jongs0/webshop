import { useQuery } from "@tanstack/react-query";
import type { OrderDTO } from "../types/models";
import { API_URL } from "../App";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { Card, Col, Row } from "react-bootstrap";

interface OrderQuery {
    data: OrderDTO,
    isLoading: boolean,
    error: Error
}

const OrderConfirmationPage = () => {
    const params = useParams()

    const {
        data: fetchedOrder,
        isLoading: isLoading,
        error: fetchError
    } = useQuery<OrderDTO>({
        meta: {headers: {"Authorization":}}
        queryKey: ["order"], queryFn: async () => {
            const response = await fetch(`${API_URL}/order/${params.orderId}`);
            if (!response.ok) {
                throw new Error("project error")
            }
            return response.json();
        },
    })

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (fetchError) {
        return <p>The order could not be retrieved.</p>
    }


    if (fetchedOrder !== undefined) {
        return (
            <>
                <h1>Bedankt voor de bestelling!</h1>
                <Row className="g-4">
                    {fetchedOrder.orderItems.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={6} lg={3}>
                            <Card className="h-100">
                                <Link
                                    to={`/products/${product.id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    {/* <Card.Img
                                        variant="top"
                                        src={getProductCategoryImage(product.category)}
                                        alt={product.name}
                                    /> */}
                                    <Card.Body>
                                        <Card.Title>{product.productName}</Card.Title>
                                        <Card.Text>€{product.lineTotal}</Card.Text>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
}

export default OrderConfirmationPage;