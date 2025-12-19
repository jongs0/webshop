import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import shippingImg from "../../assets/images/usp/shipping.png";
import trialImg from "../../assets/images/usp/trial.png";
import warrantyImg from "../../assets/images/usp/warranty.png";
import co2Img from "../../assets/images/usp/co2.png";

const UspBarComponent = () => {
  return (
    <div className="usp-background py-4">
      <div className="container">
        <Row className="text-center g-4">
          <Col xs={6} md={3}>
            <img className="usp-image mb-2" src={shippingImg} alt="Shipping included" />
            <p className="mb-0">Shipping included</p>
          </Col>

          <Col xs={6} md={3}>
            <img className="usp-image mb-2" src={trialImg} alt="30-day free trial" />
            <p className="mb-0">30-day free trial</p>
          </Col>

          <Col xs={6} md={3}>
            <img className="usp-image mb-2" src={warrantyImg} alt="12-month warranty" />
            <p className="mb-0">Min 12-month warranty</p>
          </Col>

          <Col xs={6} md={3}>
            <img className="usp-image mb-2" src={co2Img} alt="Saves CO₂ vs new" />
            <p className="mb-0">Saves CO₂ vs new</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UspBarComponent;


// const UspBarComponent = () => {

//     return (
//         <div className="usp-background">
//             <div className="container usp">
//                 <div className="item">
//                     <img className="usp-image" src="./src/assets/images/usp/shipping.png" alt="shipping"/>
//                     <p>Shipping included</p>
//                 </div>
//                 <div className="item">
//                     <img className="usp-image" src="./src/assets/images/usp/trial.png" alt="trial" />
//                     <p>30-day free trial</p>
//                 </div>
//                 <div className="item">
//                     <img className="usp-image" src="./src/assets/images/usp/warranty.png" alt="warranty" />
//                     <p>Min 12-month warranty</p>
//                 </div>
//                 <div className="item">
//                     <img className="usp-image" src="./src/assets/images/usp/co2.png" alt="co2" />
//                     <p>Saves CO₂ vs new</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default UspBarComponent;