import { mechanicAxiosInstance } from "../axios/Instance";

const Mechanicregister = (data) => {
  return mechanicAxiosInstance.post("/register", data);
};
const otpSubmit = (data) => {
  return mechanicAxiosInstance.post("/verifyOtp", data);
};
const mechanicSignin = (data) => {
  return mechanicAxiosInstance.post("/login", data);
};
const authMechanic = () => {
  return mechanicAxiosInstance.get("/isMechanicAuth");
};

export { Mechanicregister, otpSubmit, mechanicSignin, authMechanic };
