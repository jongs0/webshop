import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const TradeInBannerComponent = () => {
  return (
    <div className="container trade-in my-5">
      <Row className="align-items-center">
        {/* Tekst links */}
        <Col xs={12} md={6} className="text-start">
          <h3 className="trade-in-title">Sell your phone</h3>
          <p>Up to €200 for your current phone!</p>
          <Button variant="primary">
            Contact us
          </Button>
        </Col>

        {/* Afbeelding rechts */}
        <Col xs={12} md={6} className="text-center">
          <img
            className="img-fluid image-medium"
            src="/src/assets/images/usp/trade-in.png"
            alt="Trade-in phone"
          />
        </Col>
      </Row>
    </div>
  );
};

export default TradeInBannerComponent;


// const TradeInBannerComponent = () => {

//     return (
//         <div className="">
//             <div className="container trade-in horizontal">
//                     <div style={{ textAlign: "left", justifyContent: "space-between", }} className="">
//                         <h3 className="trade-in-title">Sell your phone</h3>
//                         <p>Up to 200 euro for your current phone!</p>
//                         <button>
//                             Sell now
//                         </button>
//                     </div>
//                     <div>
//                         <img className="image-medium" src="src/assets/images/usp/trade-in.png" alt="" />
//                     </div>
//             </div>
//         </div>

//     )
// }

// export default TradeInBannerComponent;