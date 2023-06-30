import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  image: "",
  experience: "",
  qualification: "",
  brandserved: "",
  status: "",
};

const mechanicSlice = createSlice({
  name: "mechanic",
  initialState,
  reducers: {
    setmechanicDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.image = action.payload.image;
      state.experience = action.payload.experience;
      state.qualification = action.payload.qualification;
      state.certificate = action.payload.certificate;
      state.status = action.payload.status;
      state.slots=action.payload.slots;
    },
    mechlogin: (state, action) => {
      state.value = { ...action.payload, isMechanicAuth: true };
    },
    mechlogout: (state) => {
      state.value = {
        isMechanicAuth: false,
        mechanic: null,
      };
    },
  },
});

export const { setmechanicDetails, mechlogin, mechlogout } =
  mechanicSlice.actions;
export default mechanicSlice.reducer;
