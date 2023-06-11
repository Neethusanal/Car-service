import { configureStore } from "@reduxjs/toolkit";


import userReducer from "./UserSlice";
import adminReducer from './AdminSlice';
import mechanicReducer from './MechanicSlice'


export default configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    mechanic:mechanicReducer,
   
  },
});
