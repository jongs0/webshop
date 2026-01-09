import { Col, Container, Image, Nav, Navbar, Row, Stack } from "react-bootstrap";
import { Link } from "react-router";

const Footer = () => {
    return (
        <>
            <Navbar bg='primary' className="footer justify-content-center">
                <Stack direction="horizontal" gap={2}>
                    <Container className="whitebackground">
                        <Nav className="whitebackground flex-column">
                            <h3>Support:</h3>
                            <Link className="nav-link" to="/support">FAQ</Link>
                            <Link className="nav-link" to="/support">Return</Link>
                            <Link className="nav-link" to="/support">Careers</Link>
                            <Link className="nav-link" to="/support">About us</Link>
                        </Nav>
                    </Container>
                    <Container fluid="sm">
                            <Row>
                                <h3>Payment Methods</h3>
                            </Row>
                            <Row>
                            <Col xs={3}>
                                <Image className="logo" src="/images/mastercard.svg" />
                                <Image className="logo" src="/images/visa_white.svg" />
                            </Col>
                            <Col xs={3}>                            
                                <Image className="logo" src="/images/pay_apple_pay.svg" />
                                <Image className="logo"  src="/images/pay_google_pay.svg" />
                            </Col>
                            <Col xs={3}>
                                <Image className="logo" src="/images/pay_paypal_logo.svg" />
                                <Image className="logo" src="/images/klarna.svg" />
                                </Col>
                            </Row>
                    </Container>
                    <Container>
                        <Row>
                        <h2>Reviews</h2>
                        </Row><Col>
                        <Image className="logo" src="/images/placeholder_review_1.png" />
                                <Image className="logo" src="/images/placeholder_review_2.png" />
                                <Image className="logo" src="/images/placeholder_review_3.png" />
                        </Col>
                        <Row>
                        <h3>Vragen? Bel ons!</h3>
                        <h3>000-123-4567</h3>
                        </Row>
                    </Container>
                </Stack>
            </Navbar>
        </>
    )

}

export default Footer;