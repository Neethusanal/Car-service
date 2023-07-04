import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { getExpertMechanic } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';

export const Staff = () => {
  const [staff,setStaff]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    getStaff()

  },[])
  const handleClick=(mechanic)=>{
    console.log(mechanic,"mechanicdetails")
    navigate('/bookslot',{ state: { mechanic} })
  }
  const getStaff=()=>{
    getExpertMechanic().then((res)=>{
      console.log(res.data)
      if(res.data.success)
      {
        setStaff(res.data.result)
      }
    })
  }
  console.log(staff,'staffdetails')
  return (
    <div>
      <Navbar/>
      <div className="flex flex-wrap">
      {staff.map((mechanic,index)=>{
        return(
 <Card className="mt-20 ml-14 w-80 flex">
 <CardHeader color="blue-gray" className="relative h-56">
   <img src={mechanic.image} className="h-72 w-80 sm:w-auto md:w-auto lg:w-auto"/>
 </CardHeader>
 <CardBody>
   <Typography variant="h5" color="blue-gray" className="mb-2">
   Name:{mechanic.name}
   </Typography>
   <Typography>
    Qualification:{mechanic.qualification}
   </Typography>
   <Typography>
   Experience: {mechanic.experience}
   </Typography>
 </CardBody>
 <CardFooter className="pt-0 ">
   <Button onClick={()=>handleClick(mechanic)}>select</Button>
   <Button className="ml-2" >chat</Button>
 </CardFooter>
</Card>
        )
      })}
     </div>
    </div>
  )
}
