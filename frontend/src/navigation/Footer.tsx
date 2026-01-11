import { Col, Container, Image, Navbar, Row, Stack } from "react-bootstrap";
import { Link } from "react-router";
import "../styles/general/footerStyling.css";

const Footer = () => {
    return (
        <>
            <Navbar bg='primary' className="footer justify-content-center">
                <Stack direction="horizontal" gap={2}>
                    <Container fluid="xs" className="justify-content-end, side-container">
                        <Col xs={6} className="whitebackground flex-column">
                            <h3>Support:</h3>
                            <Link className="nav-link" to="/support">FAQ</Link>
                            <Link className="nav-link" to="/support">Return</Link>
                            <Link className="nav-link" to="/support">Careers</Link>
                            <Link className="nav-link" to="/support">About us</Link>
                        </Col>
                    </Container>
                    <Container className="justify-content-center, image-container">
                        <Row>
                            <h3 className="image-row">Payment Methods</h3>
                        </Row>
                        <Row className="image-row">
                            <div className="image-div">
                                <Image className="logo-payment" src="/images/mastercard.svg" fluid/>
                            </div><div className="image-div">
                                <Image className="logo-payment" src="/images/visa_white.svg" fluid />
                            </div><div className="image-div">
                                <Image className="logo-payment" fluid src="/images/pay_apple_pay.svg" />
                            </div>
                        </Row>
                        <Row className="image-row">
                            <div className="image-div">
                                <Image className="logo-payment" fluid src="/images/pay_google_pay.svg" />
                            </div><div className="image-div">
                                <Image className="logo-payment" fluid src="/images/pay_paypal_logo.svg" />
                            </div><div className="image-div">
                                <Image className="logo-payment" fluid src="/images/klarna.svg" />
                            </div>
                        </Row>
                    </Container>
                    <Container fluid="xs" className="justify-content-center, side-container">
                        <Row>
                            <h3>Reviews</h3>
                        </Row>
                        <Row className="image-row-rev, justify-content-center">
                            <div className="image-div-rev">
                            <Image className="logo-review" fluid src="/images/prof_checkmark.png" roundedCircle />
                            </div><div className="image-div-rev">
                            <Image className="logo-review" fluid src="/images/prof_stars.png" />
                            </div><div className="image-div-rev">
                            <Image className="logo-review" fluid src="/images/placeholder_review_3.png" />
                            </div>
                        </Row>
                        <Row>
                            <h5>Questions? Call us!</h5>
                            <h5>000-123-4567 24/7</h5>
                        </Row>
                    </Container>
                </Stack >
            </Navbar >
        </>
    )

}

export default Footer;