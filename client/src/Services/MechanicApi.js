import {mechanicAxiosInstance} from '../axios/Instance'


const Mechanicregister=(data)=>{
   console.log(data);
    return mechanicAxiosInstance.post('/register',data)
 }
 const otpSubmit=(data)=>{
    return mechanicAxiosInstance.post('/verifyOtp',data)
 }
 const mechanicSignin=(data)=>{
   return mechanicAxiosInstance.post('/login',data)
 }

 export{Mechanicregister,otpSubmit,mechanicSignin}