import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";

type Props = {
  product: any;
  category: string;
};

const CategoryProductCard = ({ product, category }: Props) => {
  const navigate = useNavigate();
  console.log("GRID RECEIVED CATEGORY:", category);


  const handleClick = () => {
    navigate(`/product/${category}/${getVariantParam(product)}`);
  };

  return (
    <Card
      className="h-100"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>

        <Card.Text className="text-muted">
          {getSubtitle(product, category)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CategoryProductCard;

const getSubtitle = (product: any, category: string) => {
  if (category === "iphone") return product.iphoneGeneration;
  if (category === "macbook") return product.macbookChipType;
  if (category === "ipad") return product.ipadGeneration;
  if (category === "iwatch") return product.releaseYear;
  return "";
};

const getVariantParam = (product: any) => {
  return (
    product.iphoneGeneration ??
    product.macbookChipType ??
    product.ipadGeneration ??
    product.releaseYear
  );
};
