import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth:"false",
  id:"",
  name: "",
  email: "",
  mobile: "",
  cart: [],
  servicelocation: "",
  brand:"",
  model:"",
  cartTotal:"",
  basicPay:""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      
      state.id=action.payload.id
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.cart = action.payload.cart;
      state.servicelocation = action.payload.servicelocation;
      state.brand=action.payload.brand;
      state.model=action.payload.model
      state.basicPay=action.payload.basicPay
      state.address=action.payload.address
      state.cartTotal=action.payload.cartTotal
      state.bookedSlots=action.payload.bookedSlots
      state.bookedservices=action.payload.bookedservices
      state.auth=action.payload.auth

    },
    updateUserLocation: (state, action) => {
      state.servicelocation = action.payload;
    },
    userlogin: (state, action) => {
      state.value = { ...action.payload, UserAuth: true };
    },
    userlogout: (state) => {
      state.value = {
        UserAuth: false,
        user: null,
      };
    },
  },
});

export const { setUserDetails, updateUserLocation, userlogin, userlogout } =
  userSlice.actions;
export default userSlice.reducer;
