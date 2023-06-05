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
  },
});

export const { setadminDetails } = adminSlice.actions;
export default adminSlice.reducer;
