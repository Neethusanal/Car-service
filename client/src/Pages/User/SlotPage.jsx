import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import Navbar from '../../Components/Navbar';
import { availableSlots } from '../../Services/UserApi';

export const SlotPage = () => {

  const [selectedSlot, setSelectedSlot] = useState(null);
  useEffect(()=>{
    getAvailableSlots()
  })
  const getAvailableSlots=()=>{
      availableSlots().then((res)=>{
        console.log(res.data)
      })
  }

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    // Handle the booking logic here
    if (selectedSlot) {
      // Perform booking action
      console.log(`Booking slot: ${selectedSlot}`);
    }
  };

  return (
 
    <div>
         <Navbar/>
        <Card className="mt-20 w-auto">
          <CardHeader color="indigo" className="text-white">
            <Typography className="text-center font-bold text-lg">Book Your Slot</Typography>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col items-center">
              
            </div>
          </CardBody>
        </Card>
      </div>

  );
};
