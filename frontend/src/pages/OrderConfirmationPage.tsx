import { useQuery } from "@tanstack/react-query";
import type { OrderDTO, OrderItemDTO } from "../types/models";
import { API_URL } from "../App";
import { Link, useParams } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import { currentUser } from "../stores/UserStore";

const getProductImage = (productId: number): string | null => {
    const key = `product_images_${productId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
        try {
            const imageUrls = JSON.parse(stored);
            if (Array.isArray(imageUrls) && imageUrls.length > 0) {
                const firstUrl = imageUrls[0];
                if (firstUrl && typeof firstUrl === "string" && firstUrl.trim() !== "") {
                    return firstUrl;
                }
            }
        } catch (error) {
            return null;
        }
    }
    return null;
};

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
                                    {fetchedOrder.orderItems.map((product: OrderItemDTO) => {
                            const productImage = getProductImage(product.productId);
                            return (
                            <Row className="justify-content-md-center" key={product.id} xs={12} sm={6} md={6} lg={3}>
                                <Card className="h-100">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="text-decoration-none text-dark"
                                    >
                                        <Card.Body style={{ display: "flex", alignItems: "center", gap: "15px", padding: "15px" }}>
                                            {productImage && (
                                                <div style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    minWidth: "100px",
                                                    overflow: "hidden",
                                                    backgroundColor: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "4px",
                                                    padding: "5px"
                                                }}>
                                                    <img
                                                        src={productImage}
                                                        alt={product.productName}
                                                        style={{
                                                            maxWidth: "100%",
                                                            maxHeight: "100%",
                                                            width: "auto",
                                                            height: "auto",
                                                            objectFit: "contain"
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = "none";
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div style={{ flex: 1 }}>
                                                <Card.Title style={{ marginBottom: "8px" }}>{product.productName}</Card.Title>
                                                <Card.Text>{product.quantity}x = €{product.lineTotal}</Card.Text>
                                            </div>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Row>
                            );
                        })}
                    </Col>
            </Container>
        )
    }
}

export default OrderConfirmationPage;