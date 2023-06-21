
import React from 'react'
import Navbar from '../../Components/Navbar'
import { ServicePlans } from '../../Components/ServicePlans'
import { Cart } from '../../Components/Cart'



export const Services = () => {
  return (
    <div>
        <Navbar/>
    <ServicePlans/>
    <Cart/>


    </div>
  )
}
