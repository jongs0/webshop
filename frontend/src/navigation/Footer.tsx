import { Col, Container, Image, Nav, Navbar, Row, Stack } from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <Navbar bg='primary' className="footer justify-content-center">
                <Stack direction="horizontal" gap={2}>
                    <Container className="whitebackground">
                        <Nav className="whitebackground flex-column">
                            <h3>SUPPORT:</h3>
                            <Nav.Link href="">FAQ</Nav.Link>
                            <Nav.Link href="">Contact us</Nav.Link>
                            <Nav.Link href="">Return</Nav.Link>
                            <Nav.Link href="">Careers</Nav.Link>
                            <Nav.Link href="">About us</Nav.Link>
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