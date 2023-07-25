import React, { useEffect, useState } from 'react';
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
  const navigate = useNavigate()
  const slotsdata = useSelector((state) => state.mechanic.slots)
  console.log(slotsdata)
  useEffect(()=>{

  },[selectedTime])

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
    setSelectedMorningSlot(null); // Reset selected morning slot for the new date
    setSelectedAfternoonSlot(null); // Reset selected afternoon slot for the new date
  };
  const handleSlotClick = (startTime) => {
    if (selectedTime.includes(startTime)) {
      setSelectedTime(selectedTime.filter((val) => val !== startTime));
    } else {
      setSelectedTime([...selectedTime, startTime]);
    }
  }


  const handleSubmit = (slotsselected) => {
    console.log(slotsselected, "timesslots")
    mechanicSelectedSlots({ slotsselected }).then((res) => {
      if (res.data.success) {
        Swal.fire(res.data.message)
      }

    })
  }

  return (
    <>

<div className="flex justify-center">
        <Card className="w-full sm:w-96 mt-28 bg-gray-100">
          <CardHeader color="blue-gray" className="relative h-10">
            <h1 className='text-center'>SLOTS</h1>
          </CardHeader>
          <CardBody className='flex flex-col items-center'>
            {dates.map((date, index) => (
              <div key={index} className="mb-4">
                <button
                  className={`w-32 h-14 border-2 border-gray-600 bg-orange-50 ${date.showSlots ? 'bg-blue-200' : ''}`}
                  onClick={() => handleDateClick(date.date)}
                >
                  <Moment format="YYYY-MM-DD">{date.date}</Moment>
                </button>
                {date.showSlots && (
                  <div className="flex flex-col items-center">
                    <Button
                      onClick={() => handleSlotClick(date.morningSlot)}
                      className={`mt-2 ${slotsdata.includes(date.morningSlot) ? 'bg-red-300' : 'bg-green-300'}`}
                      disabled={slotsdata.includes(date.morningSlot)}
                    >
                      8am - 1pm
                    </Button>
                    <Button
                      onClick={() => handleSlotClick(date.afternoonSlot)}
                      className={`mt-2 ${slotsdata.includes(date.afternoonSlot) ? 'bg-red-300' : 'bg-green-300'}`}
                      disabled={slotsdata.includes(date.afternoonSlot)}
                    >
                      2pm - 6pm
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardBody>

          <CardFooter className="pt-0">
            <Button type="submit" className='flex items-center' onClick={() => handleSubmit(selectedTime)}>submit</Button>
          </CardFooter>
        </Card>
      </div>


    </>
  );
};