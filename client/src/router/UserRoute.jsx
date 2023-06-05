import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Pages/User/Register'
import Login from '../Pages/User/Login'
import { Otppage } from '../Pages/User/Otppage'
import { Homepage } from '../Pages/User/Homepage'


const UserRoute = () => {
  return (
    <>
    <Routes>
    <Route exact path='/' element={<Homepage/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/otp' element={<Otppage/>}/>
    </Routes>
    </>
  )
}

export default UserRoute