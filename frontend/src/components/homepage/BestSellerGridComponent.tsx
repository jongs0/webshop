import ProductCardComponent from "./ProductCardComponent";

const BestSellerGridComponent = () => {
  return (
    <div className="container bestseller">
      <h2 className="mb-4">Our bestsellers</h2>
    <ProductCardComponent
      title="Our bestsellers"
      queryKey={["bestsellers"]}
      endpoint="/products/bestsellers"
    />
    </div>
  );
};

export default BestSellerGridComponent;