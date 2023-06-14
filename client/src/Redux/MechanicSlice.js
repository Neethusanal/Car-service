
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  image: "",
  token: "",
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
      
    },
    mechlogin:(state,action)=>{
      state.value={...action.payload,
      isMechanicAuth:true
    }
    },
    mechlogout:(state)=>{
      state.value={
        isMechanicAuth:false,
        mechanic:null,
      }
    }
  },
});

export const { setmechanicDetails,mechlogin,mechlogout } = mechanicSlice.actions;
export default mechanicSlice.reducer;
