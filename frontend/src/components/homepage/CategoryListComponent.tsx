import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const CategoryListComponent = () => {

    const categories = [
        {
            id: 1,
            name: 'Iphones',
            image: '/src/assets/images/category/iphone-category.webp',
            link: '/category/iphone'
        },
        {
            id: 2,
            name: 'Macbooks',
            image: 'src/assets/images/category/macbook-category.webp',
            link: '/category/macbook'
        },
        {
            id: 3,
            name: 'Ipads',
            image: 'src/assets/images/category/ipad-category.webp',
            link: '/category/ipad'
        },
        {
            id: 4,
            name: 'Iwatches',
            image: 'src/assets/images/category/iwatch-category.webp',
            link: '/category/iwatch'
        }
    ];

    return (
        <div className="container category-list">
            <Row className="g-4">
                {categories.map(category => (
                    <Col key={category.id} xs={12} sm={6} md={3}>
                        <a href={category.link} style={{ textDecoration: 'none' }}>
                            <Card>
                                <Card.Img variant="top" src={category.image} />
                                <Card.Body>
                                    <Card.Title>{category.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
        </div>

    );
};

export default CategoryListComponent;

// const CategoryListComponent = () => {

//   return (
//     <div className="container category-list">
//         <div className="item vertical">
//             <img className="image-small" src="src/assets/images/category/iphone-category.webp" alt="" />
//             <p>Iphone</p>
//         </div>
//         <div className="item vertical">
//             <img className="image-small" src="src/assets/images/category/macbook-category.webp" alt="" />
//             <p>Macbook</p>
//         </div>
//         <div className="item vertical">
//             <img className="image-small" src="src/assets/images/category/ipad-category.webp" alt="" />
//             <p>Ipad</p>
//         </div>
//         <div className="item vertical">
//             <img className="image-small" src="src/assets/images/category/iwatch-category.webp" alt="" />
//             <p>Iwatch</p>
//         </div>
//     </div>
//   );
// };

// export default CategoryListComponent;