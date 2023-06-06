import React from 'react'
import { MechanicNavbar } from '../Components/MechanicNavbar'
import { Outlet } from 'react-router-dom'

const Mechaniclayout = () => {
  return (
    <div>
        <MechanicNavbar/>
        <Outlet/>

    </div>
  )
}

export default Mechaniclayout