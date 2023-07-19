import React from 'react'
import { MechanicNavbar } from '../Components/MechanicNavbar'
import { Outlet } from 'react-router-dom'

const Mechaniclayout = () => {
  return (
    <>
    <div className="max-w-screen-xl mx-auto rounded-2xl">
        <MechanicNavbar/>
        <div className='container mx-auto'>

        <Outlet/>
        </div>

    </div>
    </>
  )
}

export default Mechaniclayout