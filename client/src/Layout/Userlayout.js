import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

export const Userlayout = () => {
  return (
    <>
        <Navbar/>
        <div className='container mx-auto'>

        <Outlet/>
        </div>
    </>
  )
}
