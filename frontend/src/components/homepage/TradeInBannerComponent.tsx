import { Link } from "react-router";

const TradeInBannerComponent = () => {
  return (
    <div className="trade-in-text container trade-in my-5">
      {/* Container voor rij */}
        {/* Tekst links */}
        <div className="text-start">
          <h3 className="trade-in-title">Sell your phone</h3>
          <p>Up to €200 for your current phone!</p>
          <Link to="/support">
            <button className="btn-white">
              Contact us
            </button>
          </Link>
        </div>

        {/* Afbeelding rechts */}
        <div className=" text-center">
          <img
            className="img-fluid image-medium"
            src="/src/assets/images/usp/trade-in.png"
            alt="Trade-in phone"
          />
        </div>
      </div>
   
  );
};

export default TradeInBannerComponent;