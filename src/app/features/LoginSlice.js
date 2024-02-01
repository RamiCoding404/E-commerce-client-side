import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosconfig";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";

const { toast } = createStandaloneToast();
const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.post(`/auth/local`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        //ta7ded wa2t cookies
        const date = new Date();
        const in_days = 3;
        const expiresAt = 1000 * 60 * 60 * 24 * in_days;
        date.setTime(date.getTime() + expiresAt);
        const options = { path: "/", expires: date };
        //---------------------
        CookieService.set("jwt", action.payload.jwt, options);
        toast({
          title: "Logged in successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          document.location.href = "/";
        }, 2000);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload;
        toast({
          title: action.payload.response.data.error.message,
          status: "error",
          description: "make sure you have the correct Email or Password",
          duration: 3000,
          isClosable: true,
        });
      });
  },
});

export const selectLogin = ({ login }) => login;
export default LoginSlice.reducer;
