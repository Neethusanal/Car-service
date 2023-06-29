import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "@material-tailwind/react";

import Moment from 'react-moment';
import moment from 'moment';

export const SlotMechanic = () => {
  const [selectedDate, setSelectedDate] = useState(null);
const [selectedSlot, setSelectedSlot] = useState(null);
  const generateDateArray = () => {
    const dates = [];
    const today = moment().startOf("day");

    for (let i = 1; i < 9; i++) {
      const date = moment(today).add(i, 'days');

      const morningSlotStart = moment(date).clone().set('hour', 9).set('minute', 0).set('second', 0);
      const morningSlotEnd = moment(date).clone().set('hour', 13).set('minute', 0).set('second', 0);
      const afternoonSlotStart = moment(date).clone().set('hour', 14).set('minute', 0).set('second', 0);
      const afternoonSlotEnd = moment(date).clone().set('hour', 18).set('minute', 0).set('second', 0);

      dates.push({
        date: date,
        morningSlot: [morningSlotStart, morningSlotEnd],
        afternoonSlot: [afternoonSlotStart, afternoonSlotEnd],
        showSlots: false,
        selectedSlot: null,
        onClick: () => handleDateClick(date),
      });
    
    }

    return dates;
  };

  const [dates, setDates] = useState(generateDateArray());


  const handleDateClick = (date) => {
    setSelectedDate(date);
    const updatedDates = dates.map((d) => {
      if (moment(d.date).isSame(date, 'day')) {
        return {
          ...d,
          showSlots: true,
          selectedSlot: null, // Reset selected slot when date is clicked
        };
      } else {
        return {
          ...d,
          showSlots: false,
          selectedSlot: null, // Reset selected slot for other dates
        };
      }
    });
    setDates(updatedDates);
  };



  return (
    <>
      <Card className="w-full mt-28 bg-blue-gray-50">
        <CardHeader color="blue-gray" className="relative h-10">
          <h1 className='text-center'>SLOTS</h1>
        </CardHeader>
        <CardBody className='flex'>
        {dates.map((date, index) => (
  <div key={index}>
    <button
      className='mt-10 ml-6 w-32 h-14 border-2 border-gray-600 bg-orange-50'
      onClick={() => handleDateClick(date.date)} // Pass the date to handleDateClick function
    >
      <Moment format="YYYY-MM-DD">{date.date}</Moment>
    </button>
    {date.showSlots && (
  <>
    <Button  onClick={() => setSelectedSlot(date.morningSlot)} className="mt-2 bg-green-300">
     8am - 1pm
    </Button>
    <Button onClick={() => setSelectedSlot(date.afternoonSlot)} className="mt-2 bg-green-300">
      2pm- 6pm
    </Button>
  </>
)}

  </div>
))}
  
</CardBody>
        <CardFooter className="pt-0">
          {/* <Button>Read More</Button> */}
        </CardFooter>
      </Card>
    </>
  );
};
