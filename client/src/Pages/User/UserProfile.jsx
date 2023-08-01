import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../Redux/UserSlice';

export const UserProfile = () => {
  const user = useSelector((state) => state.user)
  const [address, setAddress] = useState()
  const [email, setEmail] = useState()
  
  const navigate = useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    setEmail(user.email)
  })
  const handleProfile = () => {

    updateUserProfile({ address, email}).then((res) => {
      
      console.log(res)
      dispatch(
        setUserDetails({

       ...user,adress:res.data.result

        }))
    })
  }
  const handleClose = () => {
    navigate('/')
  }

  return (
    <div>


      

  
      <Card className="mt-20 ml-10 mr-10  flex flex-justify-center">
        <CardHeader color="blue-gray" className="relative h-12">
          <h1 className='text-center font-bold'> Profile</h1>
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-light text-gray-700"
              >
                Name
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.name}

                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block mb-2 font-light text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.mobile}

                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block mb-2 font-light text-gray-700"
              >
                Email
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.email}

                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-light text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

          </Typography>

        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={() => handleProfile()}>UpdatePofile</Button>
          <Button type="submit" className="ml-2" onClick={() => handleClose()}  >close</Button>
        </CardFooter>
      </Card> 

    </div>
  )
}
