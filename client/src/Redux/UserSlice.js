import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  cart: [],
  servicelocation: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.cart = action.payload.cart;
      state.services = action.payload.services;
      state.packages = action.payload.packages;
      state.servicelocation = action.payload.servicelocation;
    },
    updateUserLocation: (state, action) => {
      state.servicelocation = action.payload;
    },
    userlogin: (state, action) => {
      state.value = { ...action.payload, isUserAuth: true };
    },
    userlogout: (state) => {
      state.value = {
        isUserAuth: false,
        user: null,
      };
    },
  },
});

export const { setUserDetails, updateUserLocation, userlogin, userlogout } =
  userSlice.actions;
export default userSlice.reducer;
