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
const getLocations = () => {
  return userAxiosInstance.get("/getlocations");
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
  getServicePlans,
  addPlansToCart,
  deleteItem,
  updateUserProfile,
 updateUser,
 getLocations,
};
