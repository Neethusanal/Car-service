import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useSelector } from 'react-redux';
import { UserBanner } from '../../Components/UserBanner';
import { UserServices } from '../../Components/UserServices';



export const Homepage = () => {
  
  return (
    <div>
      <Navbar/>
      <UserBanner/>
      <UserServices/>
      
    </div>
  )
}
