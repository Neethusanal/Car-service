import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux';

export const Payment = () => {
  const user = useSelector((state) => state.user)
  const [vehicleBrand, setVehicleBrand] = useState(user?.brand);
  const [vehicleModel, setVehicleModel] = useState(user?.model);
  const [serviceType, setServiceType] = useState(user?.bookedservices);
  const [selectedslot,setSelectedSlot]=useState(user?.bookedSlots)

  
  return (
    <>
      <Navbar />
      <div className="mt-10 flex  justify-center">
      <Card color="gray" variant="gradient" className="w-full max-w-[60rem] p-8">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="black"
            className="font-extrabold-uppercase text-white"
          >
            Checkout
          </Typography>
        </CardHeader>
        <CardBody className="p-0">

          <table className="min-w-full divide-y divide-gray-800">
     
      <tbody className="bg-white divide-y divide-gray-500">
      
        <tr>
          <td className="px-6 py-4 text-black whitespace-nowrap">VehicleBrand:</td>
          <td className="px-6 py-4  text-black whitespace-nowrap">{vehicleBrand}</td>
         
         
        </tr>
        <tr>
        <td className="px-6 py-4 text-black whitespace-nowrap">VehicleModel:</td>
          <td className="px-6 py-4  text-black whitespace-nowrap">{vehicleModel}</td>
        </tr>
        <tr>
        <td className="px-6 py-4 text-black whitespace-nowrap">Services </td>
        {serviceType.map((service,index)=>{
          return(
            <td className="px-6 py-4  text-black whitespace-nowrap">{service}</td>
          )
        })}
         
        </tr>
        <tr>
        <td className="px-6 py-4 text-black whitespace-nowrap">Booked slot </td>
          <td className="px-6 py-4  text-black whitespace-nowrap">{selectedslot}</td>
        </tr>
        
           
           
  
       
         
      </tbody>
    </table>
     
        </CardBody>
        <CardFooter className="mt-12">
          <Typography variant="small" color="black" className="font-extrabold flex justify-end">
          <Button>Pay Now</Button>
          </Typography>
        </CardFooter>
      </Card>
      </div>
    </>
  );
};
