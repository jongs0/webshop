import BestSellerGridComponent from "../components/homepage/BestSellerGridComponent";
import CategoryListComponent from "../components/homepage/CategoryListComponent";
import TradeInBannerComponent from "../components/homepage/TradeInBannerComponent";
import UspBarComponent from "../components/homepage/UspBarComponent";

const HomePage = () => {

    //const / query / handler etc

    return(
        <div className="homepage">
            <CategoryListComponent/>
            <UspBarComponent/>
            <BestSellerGridComponent/>
            <TradeInBannerComponent/>
        </div>
    )
}

export default HomePage;
 