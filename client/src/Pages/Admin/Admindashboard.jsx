 import React, { useEffect, useState } from 'react'

// import{Chart as 
//   ChartJS,
//   BarElment,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from "chart.js"
// import {Bar} from 'react-chartjs-2'
import { getBookingData } from '../../Services/AdminApi'

export const Admindashboard = () => {
const [bookingdata,SetBookingData]=useState([])
useEffect(()=>{
bookingdetails()
},[])
const bookingdetails= async()=>{
await  getBookingData().then((res)=>{
    console.log(res.data)
    SetBookingData(res.data.result)
  })
}

console.log(bookingdata,"working")
  return (
    <>
<div>
  {/* <Bar>
     data={data}
    options={options} 
  </Bar> */}
</div>


    </>
  )
}
