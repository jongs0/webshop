import { useQuery } from "@tanstack/react-query";
import type { OrderDTO } from "../types/models";
import { API_URL } from "../App";
import { Link, useParams } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import { currentUser } from "../stores/UserStore";

const OrderConfirmationPage = () => {
    const params = useParams()
    const user = currentUser();

    const {
        data: fetchedOrder,
        isLoading: isLoading,
        error: fetchError
    } = useQuery<OrderDTO>({
        queryKey: ["order"], queryFn: async () => {
            const response = await fetch(`${API_URL}/order/${params.orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.authHeader
                }
            });
            if (!response.ok) {
                throw new Error("project error")
            }
            return response.json();
        },
    })

    if (isLoading) {
        return <p>Loading order...</p>
    }
    if (fetchError) {
        return <p>The order could not be retrieved.</p>
    }


    if (fetchedOrder !== undefined) {
        return (
            <Container className="justify-content-md-center">
                <h1>Bedankt voor de bestelling!</h1>
                <h6>Hij komt eraan, en veel plezier!</h6>
                <Row/>
                    <Col className="g-4,justify-content-centre">
                                    {fetchedOrder.orderItems.map(product => (
                            <Row className="justify-content-md-center" key={product.id} xs={12} sm={6} md={6} lg={3}>
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
                                            <Card.Text>{product.quantity}x = €{product.lineTotal}</Card.Text>
                                            {/* <ListGroup className="list-group-flush">
                                                <ListGroup.Item>Price: €{product.lineTotal}</ListGroup.Item>
                                                <ListGroup.Item>Quantity: {product.quantity}</ListGroup.Item>
                                            </ListGroup> */}
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Row>
                        ))}
                    </Col>
            </Container>
        )
    }
}

export default OrderConfirmationPage;