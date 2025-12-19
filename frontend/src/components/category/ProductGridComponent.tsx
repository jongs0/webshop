import CategoryProductCard from "./CategoryProductCard";

type Props = {
  products: any[];
  category: string;
};

const ProductGridComponent = ({ products, category }: Props) => {
      console.log("GRID RECEIVED CATEGORY:", category);

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3">
          <CategoryProductCard
            product={product}
            category={category}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGridComponent
