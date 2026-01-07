import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";

type Props = {
  product: any;
  category: string;
};

const CategoryProductCard = ({ product, category }: Props) => {
  const navigate = useNavigate();
  console.log("GRID RECEIVED CATEGORY:", category);

  const getThumbnailImage = (): string | null => {
    if (product.id) {
      const categoryKey = category.toUpperCase();
      const key = `product_images_${categoryKey}_${product.id}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          const imageUrls = JSON.parse(stored);
          if (Array.isArray(imageUrls) && imageUrls.length > 0) {
            return imageUrls[0];
          }
        } catch {
          return null;
        }
      }
    }
    return null;
  };

  const thumbnailImage = getThumbnailImage();

  const handleClick = () => {
    const variant = getVariantParam(product);
    if (variant) {
      navigate(`/product/${category}/${variant}`);
    } else {
      navigate(`/product/${category}`);
    }
  };

  return (
    <Card
      className="h-100"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      {thumbnailImage && (
        <div style={{ 
          width: "100%", 
          aspectRatio: "1", 
          overflow: "hidden",
          borderRadius: "8px 8px 0 0",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <img
            src={thumbnailImage}
            alt={product.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
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

const formatGeneration = (gen: string | undefined | null): string => {
  if (!gen || typeof gen !== "string") return "";
  const match = gen.match(/GEN_(\d+)/);
  if (match) {
    const num = parseInt(match[1]);
    const suffix = num === 1 ? "st" : num === 2 ? "nd" : num === 3 ? "rd" : "th";
    return `${num}${suffix} generation`;
  }
  return gen;
};

const getSubtitle = (product: any, category: string) => {
  if (category === "iphone") return product.iphoneGeneration ? formatGeneration(product.iphoneGeneration) : "";
  if (category === "macbook") return product.macbookChipType || "";
  if (category === "ipad") return product.ipadGeneration ? formatGeneration(product.ipadGeneration) : "";
  if (category === "iwatch") return product.releaseYear ? `Released ${product.releaseYear}` : "";
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
