import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
Button
} from "@material-tailwind/react";
import { useSelector } from 'react-redux';

const MechHome = () => {
  const mechanic=useSelector((state)=>state.mechanic)
  console.log(mechanic)
  const[fullName,setFullName]=useState()
  const[email,setEmail]=useState()
  const[image,setImage]=useState()
  useEffect(()=>{
    setFullName?.(mechanic.name)
    setEmail?.(mechanic.email)

  })
  return (
    <div className='flex items-center justify-center h-screen '>

<Card className="w-96 ">
      <CardHeader floated={false} className="h-80">
        <img src="/img/team-3.jpg" alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
         {fullName}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
         {email}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        
      <Button>Edit</Button>
      </CardFooter>
    </Card>






    </div>
  )
}

export default MechHome