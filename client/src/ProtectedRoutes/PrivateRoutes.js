import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { authAdmin } from '../Services/AdminApi';
import { authMechanic } from '../Services/MechanicApi';
import { authUser} from '../Services/UserApi';
import { setUserDetails, userlogout } from '../Redux/UserSlice';
import { adminlogin, adminlogout } from '../Redux/AdminSlice';
import {  setmechanicDetails, mechlogout } from '../Redux/MechanicSlice';

function PrivateRoutes({role,route}){
    let [auth, setAuth] = useState(null);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=> {
        if(role==="user"){
            authUser().then((response)=>{
             if(!response.data.auth){
                 localStorage.removeItem('usertoken')
                 dispatch(userlogout()) 
             }else if(response.data.auth){
                 dispatch(setUserDetails(response.data))    
             }
             setAuth(response.data?.auth)    
         }).catch((response)=>{
             console.log(response);
                setAuth(response.data?.auth)
                 navigate('/login')
            }) 
           }else if(role==="admin"){
             authAdmin().then((resp)=>{
                 if(!resp.data.auth){
                     localStorage.removeItem('admintoken')
                     dispatch(adminlogout())
                 }else if(resp.data.auth){
                     dispatch(adminlogin(resp.data))
                 }
                 setAuth(resp.data.auth)
             }).catch(resp=>{
                 setAuth(resp.data?.auth)
                 navigate('/admin/login')
             })
           }else if(role==="mechanic"){
             authMechanic().then(res=>{
                 if(!res.data.auth){
                     localStorage.removeItem('mechanictoken')
                     dispatch(mechlogout())
                 }else{
                     dispatch(setmechanicDetails(res.data))
                 }
                 setAuth(res.data.auth)
             }).catch(res=>{
                 setAuth(res.data?.auth || null)
                 navigate('/mechanic/login')
             })
           }  

    },[])
    if(auth==null) return

  return (
   auth ? <Outlet/> : <Navigate to={route}/>
  )
}



export default PrivateRoutes