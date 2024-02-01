import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { useSelector } from "react-redux";
import { selectnetwork } from "../app/features/networkSlice";
const ProductsPage = () => {
  const { isOnline } = useSelector(selectnetwork);
  const getProductList = async ({ pageParam = 1 }) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/products?populate=thumbnail,category&pagination[pageSize]=3&pagination[page]=${pageParam}`
      );
      return data;
    } catch (error) {
      console.log("Failed to fetch product data");
    }
  };
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  if (isLoading || !isOnline)
    return (
      <Grid
        margin={30}
        templateColumns="repeat(auto-fill, minmax(300px,1fr))" //important
        gap={6}
      >
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Grid>
    );
  return (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill, minmax(300px,1fr))" //important
      gap={6}
    >
      {data.data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
