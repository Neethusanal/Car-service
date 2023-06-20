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
const addPlansToCart=(id)=>{
  console.log(id,"id sending to back end for adding to caert")
  return userAxiosInstance.post(`/addtocart/${id}`)
}


export { userRegister, userOtpsubmit, userSignin, authUser, getUserBanners,getUserServices ,getUserBrands,getUserModel,getServicePlans,addPlansToCart  };
