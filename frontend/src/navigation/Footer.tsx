import { Col, Container, Image, Navbar, Row, Stack } from "react-bootstrap";
import { Link } from "react-router";
import "../styles/general/footerStyling.css";

const Footer = () => {
    return (
        <>
            <Navbar bg='primary' className="footer">
                <Stack direction="horizontal" gap={0} className="footer-stack">
                    <Container fluid="xs" className="side-container">
                        <Row className="justify-content-center text-center">
                            <Col>
                                <h3 className="footer-text mb-3">Support</h3>
                                <div className="footer-links">
                                    <Link className="nav-link" to="/support">FAQ</Link>
                                    <Link className="nav-link" to="/support">Return</Link>
                                    <Link className="nav-link" to="/support">Careers</Link>
                                    <Link className="nav-link" to="/support">About us</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="image-container">
                        <Row className="justify-content-center text-center">
                            <Col>
                                <h3 className="footer-text mb-3">Payment Methods</h3>
                                <div className="payment-methods">
                                    <div className="payment-row">
                                        <div className="image-div">
                                            <Image className="logo-payment" src="/images/mastercard.svg" fluid />
                                        </div>
                                        <div className="image-div">
                                            <Image className="logo-payment" src="/images/visa_white.svg" fluid />
                                        </div>
                                        <div className="image-div">
                                            <Image className="logo-payment" fluid src="/images/pay_apple_pay.svg" />
                                        </div>
                                    </div>
                                    <div className="payment-row">
                                        <div className="image-div">
                                            <Image className="logo-payment" fluid src="/images/pay_google_pay.svg" />
                                        </div>
                                        <div className="image-div">
                                            <Image className="logo-payment" fluid src="/images/pay_paypal_logo.svg" />
                                        </div>
                                        <div className="image-div">
                                            <Image className="logo-payment" fluid src="/images/klarna.svg" />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid="xs" className="side-container">
                        <Row className="justify-content-center text-center">
                            <Col>
                                <h3 className="footer-text mb-3">Reviews</h3>
                                <div className="reviews-row">
                                    <div className="image-div-rev">
                                        <Image className="logo-review" fluid src="/images/prof_checkmark.png" roundedCircle />
                                    </div>
                                    <div className="image-div-rev">
                                        <Image className="logo-review" fluid src="/images/prof_stars.png" />
                                    </div>
                                    <div className="image-div-rev">
                                        <Image className="logo-review" fluid src="/images/placeholder_review_3.png" />
                                    </div>
                                </div>
                                <div className="contact-info mt-3">
                                    <h5 className="footer-text mb-1">Questions? Call us!</h5>
                                    <h5 className="footer-text">000-123-4567 24/7</h5>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Stack>
            </Navbar>
        </>
    )

}

export default Footer;