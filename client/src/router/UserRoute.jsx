import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Pages/User/Register'
import Login from '../Pages/User/Login'
import { Otppage } from '../Pages/User/Otppage'
import { Homepage } from '../Pages/User/Homepage'
import PrivateRoutes from '../ProtectedRoutes/PrivateRoutes'


const UserRoute = () => {
  return (
    <>
    <Routes>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/otp' element={<Otppage/>}/>
    <Route element={<PrivateRoutes  role={"user"} route={"/login"} />}>
    <Route exact path='/' element={<Homepage/>}/>
    </Route>
    </Routes>
    </>
  )
}

export default UserRoute