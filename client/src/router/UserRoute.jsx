import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Pages/User/Register'
import Login from '../Pages/User/Login'
import { Otppage } from '../Pages/User/Otppage'
import { Homepage } from '../Pages/User/Homepage'
import PrivateRoutes from '../ProtectedRoutes/PrivateRoutes'
import { Services } from '../Pages/User/Services'

import { UserCart } from '../Pages/User/UserCart'
import { SlotPage } from '../Pages/User/SlotPage'
import { Staff } from '../Pages/User/Staff'
import { UserProfile } from '../Pages/User/UserProfile'


const UserRoute = () => {
  return (
    <>
      <Routes>
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/otp' element={<Otppage />} />
        
        <Route exact path='/' element={<Homepage />} />
       
        <Route element={<PrivateRoutes role={"user"} route={"/"} />}>
        <Route exact path='/home' element={<Homepage />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/cart' element={<UserCart />} />
          <Route exact path='/bookslot' element={<SlotPage />} />
          <Route exact path='/profile' element={<UserProfile />} />
          <Route exact path='/staff' element={<Staff/>} />
       
        </Route>
      </Routes>
    </>
  )
}

export default UserRoute