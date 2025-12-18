import { CardImg } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ProductCardComponent = () => {

    return (
        <div>
            <div  className="container category-list">
                <p>Categroy List</p>
                <Row xs={1} md={2} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                            <CardImg></CardImg>    
                            <Card.Title>Catgory name</Card.Title>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default ProductCardComponent;