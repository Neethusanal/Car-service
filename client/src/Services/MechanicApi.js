import { mechanicAxiosInstance } from "../axios/Instance";

const Mechanicregister = (data) => {
  return mechanicAxiosInstance.post("/register", data);
};
const otpSubmit = (data) => {
  return mechanicAxiosInstance.post("/verifyOtp", data);
};
const updateDetails = (data) => {
  return mechanicAxiosInstance.put("/updatedetails", data);
};

const mechanicSignin = (data) => {
  return mechanicAxiosInstance.post("/login", data);
};
const authMechanic = () => {
  return mechanicAxiosInstance.get("/isMechanicAuth");
};
const getMechBrands = () => {
  return mechanicAxiosInstance.get("/getallbrands");
};
const updateProfile = (data) => {
  return mechanicAxiosInstance.put("/updateprofile", data);
};
const  mechanicSelectedSlots = (data)=>{
  return mechanicAxiosInstance.post('/savemechanicslots',data)
}

export {
  Mechanicregister,
  otpSubmit,
  mechanicSignin,
  authMechanic,
  getMechBrands,
  updateProfile,
  updateDetails,
  mechanicSelectedSlots 
};
