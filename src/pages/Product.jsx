import {
  Flex,
  Box,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import imgFalBack from "../assets/img-placeholder.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart } from "../app/features/CartSlice";
import { useSelector } from "react-redux";
import { selectnetwork } from "../app/features/networkSlice";

const ProductPage = () => {
  const { isOnline } = useSelector(selectnetwork);
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const getProductList = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/products/${id}?populate=thumbnail,category&fields=title&fields=price&fields=description`
      );
      return data;
    } catch (error) {
      console.log("Failed to fetch product data");
    }
  };
  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: getProductList,
  });

  const goBack = () => navigate(-1);

  const addToCartHandler = () => {
    dispatch(addtoCart(data.data));
  };

  if (isLoading || !isOnline)
    return (
      <Box maxW={"sm"} mx={"auto"} my={"20"}>
        <ProductSkeleton />
      </Box>
    );
  return (
    <>
      <Flex
        alignItems={"center"}
        maxW={"sm"}
        mx={"auto"}
        my={"7"}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card
        maxW="sm"
        mx={"auto"}
        mb={20}
        bg={"none"}
        border={"1px solid #a8b5c8"}
      >
        <CardBody>
          <Image
            src={data?.data?.attributes?.thumbnail?.data?.attributes?.url}
            alt={data?.data?.attributes?.title}
            borderRadius="lg"
            // h={"200px"}
            // w={"full"}
            boxSize={"200px"}
            mx={"auto"}
            objectFit={"cover"}
            fallbackSrc={imgFalBack}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"}>
              {data?.data?.attributes?.description}
            </Text>
            <Text fontSize={"2xl"} textAlign={"center"}>
              {data?.data?.attributes?.category?.data?.attributes?.title}
            </Text>
            <Text fontSize={"2xl"} textAlign={"center"}>
              ${data?.data?.attributes?.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="purple"
            onClick={addToCartHandler}
            w={"full"}
            size={"md"}
            _hover={{
              bg: colorMode != "Light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode == "Light" ? "#e6f3fd" : "#9f7aea",
              border: "transperent",
            }}
            bg={colorMode == "Light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode != "Light" ? "#e6f3fd" : "#9f7aea"}
            p={8}
            textTransform={"uppercase"}
          >
            Add To Cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductPage;
