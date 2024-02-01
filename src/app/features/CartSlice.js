import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoopingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
const initialState = {
  cartProducts: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.cartProducts = addItemToShoopingCart(
        action.payload,
        state.cartProducts
      );
    },
    removefromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id != action.payload
      );
      toast({
        title: "Removed from your Cart",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    },
    ClearCart: (state) => {
      state.cartProducts = [];
      toast({
        title: "Your Cart is empty now",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    },
  },
});

export const { addtoCart, removefromCart, ClearCart } = CartSlice.actions;
export const selectCart = (state) => state.cart.cartProducts;
export default CartSlice.reducer;
