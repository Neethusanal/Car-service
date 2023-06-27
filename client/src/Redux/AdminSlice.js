import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",

  email: "",
  token: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setadminDetails: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    adminlogin: (state, action) => {
      state.value = { ...action.payload, isAdminAuth: true };
    },
    adminlogout: (state) => {
      state.value = { isAdminAuth: false, admin: null };
    },
  },
});

export const { setadminDetails, adminlogin, adminlogout } = adminSlice.actions;
export default adminSlice.reducer;
