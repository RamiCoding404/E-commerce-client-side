import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { ClearCart, selectCart } from "../app/features/CartSlice";
const CartDrawer = () => {
  const btnRef = useRef();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCart);
  const onClose = () => {
    dispatch(onCloseCartDrawerAction());
  };

  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>

        <DrawerBody>
          {cartProducts.length ? (
            cartProducts.map((item) => (
              <CartDrawerItem key={item.id} {...item} />
            ))
          ) : (
            <Text fontSize={"md"}>Your Cart is empty</Text>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            colorScheme="red"
            mr={3}
            onClick={() => dispatch(ClearCart())}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
