/* eslint-disable react/prop-types */
import { Button, Image, Stack, Text, Flex, Divider } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removefromCart } from "../app/features/CartSlice";

const CartDrawerItem = ({
  id,
  attributes: { thumbnail, title, price },
  quantity,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Flex alignItems={"center"} mb={3} py={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${
            thumbnail.data.attributes.url
          }`}
          alt={title}
          w={"60px"}
          h={"60px"}
          rounded="full"
          objectFit={"cover"}
          mr={5}
        />
        <Stack>
          <Text fontSize={"sm"}>{title}</Text>
          <Text fontSize={"sm"}>Price: ${price}</Text>
          <Text fontSize={"sm"}>Quantity : {quantity}</Text>
          <Button
            leftIcon={<BsTrash />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            w="fit-content"
            onClick={() => dispatch(removefromCart(id))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>

      <Divider />
    </>
  );
};

export default CartDrawerItem;
