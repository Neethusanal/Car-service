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
import profile from '../../Images/profile.jpg'
import { useNavigate } from 'react-router-dom';



const MechHome = () => {
  const mechanic = useSelector((state) => state.mechanic)

  const [fullName, setFullName] = useState()
  const [email, setEmail] = useState()
  const [image, setImage] = useState()
  const [phone,setPhone]=useState()
  const navigate=useNavigate()
  useEffect(() => {

    setFullName(mechanic?.name)
    setEmail(mechanic?.email)
    setImage(mechanic?.image)
    

  }, [])
  const handleEditProfile = () => {
navigate('/mechanic/updateprofile')
  }

  return (
    <div className="flex items-center justify-center h-screen mt-10">
    <Card className="w-96 sm:w-auto md:w-auto lg:w-auto">
      <CardHeader floated={false} className="h-80">
        <img src={Image?image:profile} alt="profile-picture" className="h-80 w-96 sm:w-auto md:w-auto lg:w-auto" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {fullName}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          {email}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {phone}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Button onClick={handleEditProfile}>Edit</Button>
      </CardFooter>
    </Card>
  </div>
);
};

export default MechHome