import React, { useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux';


import { completePayment, verifyUserPayment } from '../../Services/UserApi';
import { useLocation, useNavigate } from 'react-router-dom';
 const keyId = process.env.REACT_APP_KEY_ID

export const Payment = () => {
  const user = useSelector((state) => state.user)
  const [vehicleBrand, setVehicleBrand] = useState(user?.brand);
  const [vehicleModel, setVehicleModel] = useState(user?.model);
  const [serviceType, setServiceType] = useState(user?.bookedservices);
  const [selectedslot,setSelectedSlot]=useState(user?.bookedSlots)
  const [amount,setAmount]=useState(user?.cartTotal)
  const navigate=useNavigate()
  const location = useLocation();
  const mechanic = location.state?.expertmechanic;
  const mechanicid=mechanic._id
  console.log(mechanic,"mechanixxxxxxxxxxxx")
  useEffect(()=>{
    // setVehicleBrand(user?.brand)
    // setVehicleModel(user?.model)
    // setServiceType(user?.bookedservices)
    // setSelectedSlot(user?.bookedSlots)
    setAmount(user?.cartTotal)
  })
  
const handlePayment=()=>{
 
  completePayment({amount,selectedslot,serviceType,}).then((res)=>{
   
    if(res.data){
      initPayment(res.data)
    }
  })
}
  
  const initPayment = (data) => {
 
    const options = {
      key:keyId,
      amount: amount*100,
      name:"CarDoc",
      description: "Test transaction",
      currency: data.currency,
      order_id: data.data.id,
      handler: async (response) => {
        try {
          
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          verifyUserPayment({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              user,
              amount,
              selectedslot,
              serviceType,
              vehicleBrand,
              vehicleModel,
              mechanicid
           

              
            }).then((res)=>{
            if(res.data.success)
            {
             
              navigate('/userservicehistory')
            }
             
            })

         
             
           
          
        } catch (error) {
           
          
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      
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
        <td className="px-6 py-4 text-black whitespace-nowrap">services </td>
        {serviceType.map((service,index)=>{
          return(
            <td className="px-6 py-2 block text-black whitespace-nowrap ">{service}</td>
          )
        })}
         
        </tr>
        <tr>
        <td className="px-6 py-4 text-black whitespace-nowrap">Booked slot </td>
          <td className="px-6 py-4  text-black whitespace-nowrap">{selectedslot}</td>
        </tr>
        <tr>
        <td className="px-6 py-4 text-black whitespace-nowrap">Service Charge </td>
          <td className="px-6 py-4  text-black whitespace-nowrap">Rs:{amount}</td>
        </tr>
        
           
           
  
       
         
      </tbody>
    </table>
     
        </CardBody>
        <CardFooter className="mt-12">
          <Typography variant="small" color="black" className="font-extrabold flex justify-end">
            
          <Button onClick={()=>handlePayment()}>Pay </Button>
          </Typography>
        </CardFooter>
      </Card>
      </div>
    </>
  );
};
