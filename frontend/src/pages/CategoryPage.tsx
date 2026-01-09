import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ProductGridComponent from "../components/category/ProductGridComponent";
import {
  dedupeIphones,
  dedupeMacbooks,
  dedupeIpads,
  dedupeIwatches,
} from "../components/category/categoryConfig/deduplicationHelper";
import { API_URL } from "../App";

const CategoryPage = () => {
  const { category } = useParams();

  const normalizedCategory = category?.toLowerCase();

  if (!normalizedCategory) {
    return <p>Invalid category</p>;
  }

  const {
    data: displayProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", normalizedCategory],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/${normalizedCategory}`
      );
      const data = await res.json();

      switch (normalizedCategory) {
        case "iphone":
          return dedupeIphones(data);

        case "macbook":
          return dedupeMacbooks(data);

        case "ipad":
          return dedupeIpads(data);

        case "iwatch":
          return dedupeIwatches(data);

        default:
          return [];
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <section className="container mt-4">
      <ProductGridComponent
        products={displayProducts}
        category={normalizedCategory}
      />
    </section>
  );
};

export default CategoryPage;
