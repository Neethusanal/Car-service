import { userAxiosInstance } from "../axios/Instance";

const userRegister=(data)=>{

    return userAxiosInstance.post('/register',data)
 }
 const userOtpsubmit=(data)=>{
    return userAxiosInstance.post('/userotp',data)
 }
 const userSignin=(data)=>{
    return userAxiosInstance.post('/login',data)
  }
 


 export{userRegister,userOtpsubmit,userSignin}