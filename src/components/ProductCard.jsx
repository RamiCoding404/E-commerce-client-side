/* eslint-disable react/prop-types */
import {
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Card,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, attributes }) => {
  console.log(attributes?.thumbnail);
  const { colorMode } = useColorMode();
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.url}
          alt="Green double couch with wooden legs"
          boxSize={"200px"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} rounded="">
            {attributes.title}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
            {attributes.description}
          </Text>
          <Text fontSize="2xl" textAlign={"center"}>
            {attributes.price} $
          </Text>
          <Button
            as={Link}
            to={`/products/${id}`}
            bg={colorMode == "Light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode != "Light" ? "#e6f3fd" : "#9f7aea"}
            size={"xl"}
            variant="outline"
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: colorMode != "Light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode == "Light" ? "#e6f3fd" : "#9f7aea",
              border: "transperent",
            }}
            mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
