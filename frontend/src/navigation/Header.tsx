import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar>
        <Container>
            <Nav>
            <Nav.Link type="button" href="#home">Home</Nav.Link>
            <Nav.Link href="#iPhone">iPhone</Nav.Link>
            <Nav.Link href="#iPad">iPad</Nav.Link>
            <Nav.Link href="#Macbook">Macbook</Nav.Link>
            <Nav.Link href="iWatch">iWatch</Nav.Link>
            </Nav>
            <Nav className="justify-content-end"> 
            <Nav.Link href="#support">Support</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
            </Nav>
            </Container>
    </Navbar>
  );
}

export default Header;