import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";

export const SlotPage = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);

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
        <div className="flex justify-center items-center h-screen ">
      <Card className="max-w-sm ">
        <CardHeader color="indigo" className="text-white">
          <Typography className="text-center font-bold text-lg">Slot Booking</Typography>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Typography className="text-gray-600">Select a slot:</Typography>
            </div>
            <div className="flex justify-between w-full mb-4 ">
              <Button
                color={selectedSlot === 'Morning' ? 'indigo' : 'gray'}
                onClick={() => handleSlotSelection('Morning')}
              >
                Morning
              </Button>
              <Button
                color={selectedSlot === 'Afternoon' ? 'indigo' : 'gray'}
                onClick={() => handleSlotSelection('Afternoon')}
              >
                Afternoon
              </Button>
              <Button
                color={selectedSlot === 'Evening' ? 'indigo' : 'gray'}
                onClick={() => handleSlotSelection('Evening')}
              >
                Evening
              </Button>
            </div>
            <Button
              color="indigo"
              disabled={!selectedSlot}
              onClick={handleBooking}
            >
              Book Slot
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
    </div>
  )
}
