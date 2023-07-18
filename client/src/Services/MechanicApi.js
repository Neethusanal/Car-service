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
const mechanicChats=(id)=>{
  console.log(id)
  return mechanicAxiosInstance.get(`/getmechanicchat/${id}`)
}
 const getUser=(id)=>{
  console.log(id)
   return mechanicAxiosInstance.get(`/getuserdata/${id}`)
 }
 const getMessages=(id)=>{
  console.log(id)
   return mechanicAxiosInstance.get(`/getmessage/${id}`)
 }
 const addMessage = (data) => {
  console.log(data);
  return mechanicAxiosInstance.post('/addmessage',data);
};
const bookingData=()=>{
   return mechanicAxiosInstance.get('/getservicedetails')
 }
 const updatedServices=(data)=>{
  console.log(data,"dataaaaaaaaaaaaaaa")
  return mechanicAxiosInstance.put("updatebookingstatus",data)
 }

export {
  Mechanicregister,
  otpSubmit,
  mechanicSignin,
  authMechanic,
  getMechBrands,
  updateProfile,
  updateDetails,
  mechanicSelectedSlots, 
  mechanicChats,
  getUser,
  getMessages,
  addMessage,
  bookingData,
  updatedServices
};
