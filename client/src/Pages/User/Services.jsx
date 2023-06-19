
import React from 'react'
import Navbar from '../../Components/Navbar'
import { ServicePlans } from '../../Components/ServicePlans'
import { Plans } from '../../Components/Plans'


export const Services = () => {
  return (
    <div>
        <Navbar/>
    <ServicePlans/>
    <Plans/>

    </div>
  )
}
