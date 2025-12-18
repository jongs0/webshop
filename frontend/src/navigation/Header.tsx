import { Container, Image } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <>
        <Image src="/images/banner_placeholder_rerefurbed.png" fluid />
        <Navbar>
            
            <Container>

                <Nav className="justify-content-front">
                    <Nav.Link type="button" href="#home">Home</Nav.Link>
                    <Nav.Link href="c/iphone">iPhone</Nav.Link>
                    <Nav.Link href="c/ipad">iPad</Nav.Link>
                    <Nav.Link href="c/macbook">Macbook</Nav.Link>
                    <Nav.Link href="c/iwatch">iWatch</Nav.Link>
                </Nav>

                <Nav className="justify-content-end">
                    <Nav.Link href="support">Support</Nav.Link>
                    <Nav.Link href="cart">Cart</Nav.Link>
                    <Nav.Link href="profile">Profile</Nav.Link>
                    <Nav.Link href="login">Login</Nav.Link>
                </Nav>

            </Container>
        </Navbar>
        </>
    );
}

export default Header;