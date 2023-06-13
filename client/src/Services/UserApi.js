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
const getUserBanners = () => {
  return userAxiosInstance.get("/getallbanner");
};

export { userRegister, userOtpsubmit, userSignin, authUser, getUserBanners };
