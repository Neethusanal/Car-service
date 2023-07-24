import { userAxiosInstance } from "../axios/Instance";

const userRegister = (data) => {
  return userAxiosInstance.post("/register", data);
};
const userOtpsubmit = (data) => {
  return userAxiosInstance.post("/userotp", data);
};
const userSignin = (data) => {
  return userAxiosInstance.post("/login", data);
};
const authUser = () => {
  return userAxiosInstance.get("/isUserAuth");
};
//get Banners
const getUserBanners = () => {
  return userAxiosInstance.get("/getallbanner");
};
//get Services
const getUserServices = () => {
  return userAxiosInstance.get("/getallservices");
};
const getUserBrands = () => {
  return userAxiosInstance.get("/getallbrands");
};
const getUserModel = () => {
  return userAxiosInstance.get("/getallmodels");
};
const updateBookingData=(data)=>{
  console.log(data)
  return userAxiosInstance.post("/updatebookingdetails",data)
}
const getServicePlans = (id) => {
  return userAxiosInstance.get(`/getallserviceplans/${id}`);
};
const addPlansToCart = (selectedServiceId, planId) => {
  console.log(selectedServiceId, planId, "ffff");
  return userAxiosInstance.post(`/addtocart/${selectedServiceId}/${planId}`);
};
const deleteItem = (id) => {
  console.log(id, "delete service");
  return userAxiosInstance.post(`/deletecartitem/${id}`);
};
const updateUserProfile = (data) => {
  return userAxiosInstance.put("/updateprofile", data);
};
const updateUser = (data) => {
  console.log(data)
  return userAxiosInstance.put("/updateuserloc", data);
 
};
const handleBookingData = (data) => {
  console.log(data)
  return userAxiosInstance.put("/handlebookingdata", data);
 
};
const getLocations = () => {
  return userAxiosInstance.get("/getlocations");
};

const getExpertMechanic=()=>{
  return userAxiosInstance.get('/getexpertmechanic')
}
const completePayment=(data)=>{
  console.log(data,"payment")
  return userAxiosInstance.post('/payment',data)
}
const verifyUserPayment=(data)=>{
  return userAxiosInstance.post('/verifypayment',data)
}
const getServiceHistory=(data)=>{
  console.log(data)
  return userAxiosInstance.get(`/getservicdetails?email=${data.email}`)
}
const createChatWihMechanic=(data)=>{
  console.log(data)
  return userAxiosInstance.post('/createchat',data)
}
const userChats=(id)=>{
  console.log(id)
  return userAxiosInstance.get(`/getuserchat/${id}`)
}
 const getmechanicData=(id)=>{
  console.log(id)
   return userAxiosInstance.get(`/getmechanicdata/${id}`)
 }
 const getCartData=()=>{
  
   return userAxiosInstance.get('/getcartdata')
 }
 const getMessages=(id)=>{
  console.log(id)
   return userAxiosInstance.get(`/getmessage/${id}`)
 }
 const addMessage = (data) => {
  console.log(data);
  return userAxiosInstance.post('/addmessage',data);
};
const addReview = (data) => {
  console.log(data);
  return userAxiosInstance.post('/addreview',data);
};
const getAllReview=(id)=>{

   return userAxiosInstance.get(`/getallreview/${id}`)
 }
 const updateAddress = (data) => {
  console.log(data,"herecoming")
  return userAxiosInstance.put("/updateaddress", data);
 
};
const deleteAddress = (data) => {
  console.log(data, "delete add");
  return userAxiosInstance.post('/deleteAddress',data);
};
export {
  userRegister,
  userOtpsubmit,
  userSignin,
  authUser,
  getUserBanners,
  getUserServices,
  getUserBrands,
  getUserModel,
  updateBookingData,
  getServicePlans,

  addPlansToCart,
  deleteItem,
  getCartData,
  updateUserProfile,
 updateUser,
 getLocations,
 getExpertMechanic,
 handleBookingData,
 completePayment,
 verifyUserPayment,
 getServiceHistory,
 createChatWihMechanic,
 userChats,
  getmechanicData,
  getMessages,
  addMessage,
  addReview, getAllReview,updateAddress, deleteAddress
};
