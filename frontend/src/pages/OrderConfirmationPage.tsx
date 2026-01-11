import { useQuery } from "@tanstack/react-query";
import type { OrderDTO } from "../types/models";
import { API_URL } from "../App";
import { Link, useParams } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import { currentUser } from "../stores/UserStore";
import { useState, useEffect } from "react";

const getCategoryEndpoint = (category: string): string => {
  switch (category.toLowerCase()) {
    case "iphone":
      return "iphone";
    case "macbook":
      return "macbook";
    case "ipad":
      return "ipad";
    case "iwatch":
      return "iwatch";
    default:
      return "";
  }
};

const getVariantParam = (product: any) => {
  return (
    product.iphoneGeneration ??
    product.macbookChipType ??
    product.ipadGeneration ??
    product.releaseYear
  );
};

const getThumbnailImage = (productId: number): string | null => {
  const key = `product_images_${productId}`;
  const categories = ["IPHONE", "IPAD", "MACBOOK", "IWATCH"];
  
  let stored = localStorage.getItem(key);
  
  if (!stored) {
    for (const category of categories) {
      const oldFormatKey = `product_images_${category}_${productId}`;
      stored = localStorage.getItem(oldFormatKey);
      if (stored) break;
    }
  }
  
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
    const [productDetails, setProductDetails] = useState<Record<number, { category: string; variant: string | number | null }>>({});

    const {
        data: fetchedOrder,
        isLoading: isLoading,
        error: fetchError
    } = useQuery<OrderDTO>({
        queryKey: ["order", params.orderId], 
        queryFn: async () => {
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

    useEffect(() => {
        if (!fetchedOrder?.orderItems) return;

        const fetchProductDetails = async () => {
            const details: Record<number, { category: string; variant: string | number | null }> = {};
            
            for (const item of fetchedOrder.orderItems) {
                const categories = ["iphone", "macbook", "ipad", "iwatch"];
                let found = false;
                
                for (const category of categories) {
                    try {
                        const endpoint = getCategoryEndpoint(category);
                        const response = await fetch(`${API_URL}/${endpoint}/${item.productId}`);
                        if (response.ok) {
                            const product = await response.json();
                            const variant = getVariantParam(product);
                            details[item.productId] = { category, variant };
                            found = true;
                            break;
                        }
                    } catch (error) {
                        continue;
                    }
                }
                
                if (!found) {
                    details[item.productId] = { category: "", variant: null };
                }
            }
            
            setProductDetails(details);
        };

        fetchProductDetails();
    }, [fetchedOrder]);

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
                    {fetchedOrder.orderItems.map(item => {
                        const productDetail = productDetails[item.productId];
                        const thumbnailImage = getThumbnailImage(item.productId);
                        const category = productDetail?.category || "";
                        const variant = productDetail?.variant;
                        
                        let productLink = "#";
                        if (category && variant !== null && variant !== undefined) {
                            productLink = `/product/${category}/${variant}`;
                        } else if (category) {
                            productLink = `/product/${category}`;
                        }
                        
                        const cardContent = (
                            <>
                                {thumbnailImage && (
                                    <div style={{ 
                                        width: "100%", 
                                        aspectRatio: "1", 
                                        overflow: "hidden",
                                        borderRadius: "8px 8px 0 0",
                                        backgroundColor: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <img
                                            src={thumbnailImage}
                                            alt={item.productName}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                width: "auto",
                                                height: "auto",
                                                objectFit: "contain",
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                                <Card.Body>
                                    <Card.Title>{item.productName}</Card.Title>
                                    <Card.Text>{item.quantity}x = €{item.lineTotal}</Card.Text>
                                </Card.Body>
                            </>
                        );
                        
                        return (
                            <Row className="justify-content-md-center" key={item.id} xs={12} sm={6} md={6} lg={3}>
                                <Card className="h-100">
                                    {productLink !== "#" ? (
                                        <Link
                                            to={productLink}
                                            className="text-decoration-none text-dark"
                                        >
                                            {cardContent}
                                        </Link>
                                    ) : (
                                        cardContent
                                    )}
                                </Card>
                            </Row>
                        );
                    })}
                </Col>
            </Container>
        )
    }
    
    return null;
}

export default OrderConfirmationPage;