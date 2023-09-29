import React, { Fragment, useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "@material-tailwind/react";

import Moment from 'react-moment';
import moment from 'moment';
import Swal from "sweetalert2"
import { mechanicSelectedSlots } from '../../Services/MechanicApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SlotMechanic = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMorningSlot, setSelectedMorningSlot] = useState(null);
  const [selectedAfternoonSlot, setSelectedAfternoonSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate()
  const slotsdata = useSelector((state) => state.mechanic.slots)

  useEffect(()=>{

  },[selectedTime,load])
  const handleLoad = () => {
    setLoad(!load);
  };
  const generateDateArray = () => {
    const dates = [];
    const today = moment().startOf("day");

    for (let i = 1; i < 8; i++) {
      const date = moment(today).add(i, 'days');

      const morningSlotStart = moment(date).clone().set('hour', 9).set('minute', 0).set('second', 0);
      const afternoonSlotStart = moment(date).clone().set('hour', 14).set('minute', 0).set('second', 0);


      dates.push({
        date: date,
        morningSlot: morningSlotStart.format('MMMM Do YYYY, h:mm:ss a'),
        afternoonSlot: afternoonSlotStart.format('MMMM Do YYYY, h:mm:ss a'),
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
   console.log(selectedDate,"lllllllll")
    const updatedDates = dates.map((d) => {
      if (moment(d.date).isSame(selectedDate, 'day')) {
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
    setSelectedMorningSlot(null); // Reset selected morning slot for the new date
    setSelectedAfternoonSlot(null); // Reset selected afternoon slot for the new date
  };
  const handleSlotClick = (startTime) => {
    console.log(startTime,"ddttarrtt")
    if (selectedTime.includes(startTime)) {
      setSelectedTime(selectedTime.filter((val) => val !== startTime));
    } else {
      setSelectedTime([...selectedTime, startTime]);
    }
  }
  const handleSubmit = (slotsselected) => {
    if (slotsselected.length === 0) {
      // If no slots are selected, show a message to select slots
      Swal.fire("Please select slots before submitting.");
    } else {
      // If slots are selected, proceed with the addition
      mechanicSelectedSlots({ slotsselected }).then((res) => {
        if (res.data.success) {
          handleLoad();
          Swal.fire(res.data.message);
          window.location.reload(); // Reload the page after success
        }
      });
    }
  };


  return (
    <>
 <div className="flex justify-center w-full h-full">
        <Card className=" w-screen h-52 mt-24 bg-gray-100">
          <CardHeader color="blue-gray" className=" h-28">
            <h1 className='text-center h-20 '>SLOTS</h1>
        </CardHeader>
        <CardBody className="flex flex-row items-center ">
  {dates.map((date, index) => (
    <div key={index} className="mb-2  p-3">
      <button
        className={`w-32 h-14 border-2 border-gray-600 bg-orange-50 ${date.showSlots ? 'bg-blue-200' : ''}`}
        onClick={() => handleDateClick(date.date)}
      >
        <Moment format="YYYY-MM-DD">{date.date}</Moment>
      </button>
    </div>
  ))}

</CardBody>
{/* Display slot buttons for selected dates */}
<div className="flex flex-col items-center">
  {dates
    .filter((date) => date.showSlots)
    .map((date, index) => (
      <div key={index} className="mb-2 p-3">
        <Button
          onClick={() => handleSlotClick(date.morningSlot)}
          className={`mt-2 ${
            selectedTime.includes(date.morningSlot) ? 'bg-green-300' : slotsdata.includes(date.morningSlot) ? 'bg-red-300' : 'bg-green-300'
          }`}
          disabled={slotsdata.includes(date.morningSlot)}
        >
          9am - 1pm
        </Button>
        <Button
          onClick={() => handleSlotClick(date.afternoonSlot)}
          className={`mt-2 ml-2 ${
            selectedTime.includes(date.afternoonSlot) ? 'bg-green-300' : slotsdata.includes(date.afternoonSlot) ? 'bg-red-300' : 'bg-green-300'
          }`}
          disabled={slotsdata.includes(date.afternoonSlot)}
        >
          2pm - 6pm
        </Button>
      </div>
    ))}
</div>

          <CardFooter className="pt=0">
            <Button type="submit" className='flex items-center' onClick={() => handleSubmit(selectedTime)}>submit</Button>
           </CardFooter>
        </Card>
      </div>    

    </>
  )
};


