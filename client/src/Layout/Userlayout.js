import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

export const Userlayout = () => {
  return (
    <>
<div className="max-w-screen-2xl mx-auto rounded-2xl">
        <Navbar/>
        <div >

        <Outlet/>
        </div>
        </div>
    </>
  )
}
