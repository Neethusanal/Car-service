
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  image: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      // state.image = action.payload.image;
    },
    userlogin:(state,action)=>{
      state.value={...action.payload,
        isUserAuth:true,

      }
    },
    userlogout:(state)=>{
      state.value={
        isUserAuth:false,
        user:null,
      }
    }
      
    }
  })
;

export const { setUserDetails ,userlogin,userlogout} = userSlice.actions;
export default userSlice.reducer;
