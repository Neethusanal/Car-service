import React from 'react'
import { MechanicNavbar } from '../Components/MechanicNavbar'
import { Outlet } from 'react-router-dom'

const Mechaniclayout = () => {
  return (
    <div>
        <MechanicNavbar/>
        <div className='container mx-auto'>

        <Outlet/>
        </div>

    </div>
  )
}

export default Mechaniclayout