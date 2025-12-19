// src/components/homepage/ProductImageCategoryHelper.ts

import iphoneImg from "../../assets/images/category/iphone-category.webp";
import macbookImg from "../../assets/images/category/macbook-category.webp";
import ipadImg from "../../assets/images/category/ipad-category.webp";
import iwatchImg from "../../assets/images/category/iwatch-category.webp";

export function getProductCategoryImage(category: string): string {
  switch (category) {
    case "IPHONE":
      return iphoneImg;
    case "MACBOOK":
      return macbookImg;
    case "IPAD":
      return ipadImg;
    case "IWATCH":
      return iwatchImg;
    default:
      return iphoneImg;
  }
}
