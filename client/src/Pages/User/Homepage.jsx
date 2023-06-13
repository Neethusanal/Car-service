import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useSelector } from 'react-redux';
import { UserBanner } from '../../Components/UserBanner';



export const Homepage = () => {
  const user = useSelector((state) => state.user);
  const [username, setUserName] = useState()
  return (
    <div>
      <Navbar></Navbar>
      <UserBanner/>
      
    </div>
  )
}
