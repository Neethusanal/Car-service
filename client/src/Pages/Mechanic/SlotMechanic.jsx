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
  const generateDateArray = () => {
    const dates = [];
    const today = moment();

    for (let i = 1; i < 10; i++) {
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
        selectedSlot: null
      });
    }

    return dates;
  };

  const [dates, setDates] = useState(generateDateArray());

  const toggleSlots = (index) => {
    setDates((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates[index].showSlots = !updatedDates[index].showSlots;
      return updatedDates;
    });
  };

  const selectSlot = (index, slot) => {
    setDates((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates[index].selectedSlot = slot;
      return updatedDates;
    });
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
                onClick={() => toggleSlots(index)}
              >
                <Moment format="YYYY-MM-DD">{date.date}</Moment>
              </button>
              {date.showSlots && (
                <div className="mt-2">
                  <button
                    className={`mr-2 mb-2 w-32 h-14 border-2 border-gray-600 ${date.selectedSlot === 'morning' ? 'bg-green-500' : 'bg-orange-50'
                      }`}
                    onClick={() => selectSlot(index, 'morning')}
                  >
                    Morning Slot
                  </button>
                  <button
                    className={`mr-2 mb-2 w-32 h-14 border-2 border-gray-600 ${date.selectedSlot === 'afternoon' ? 'bg-green-500' : 'bg-orange-50'
                      }`}
                    onClick={() => selectSlot(index, 'afternoon')}
                  >
                    Afternoon Slot
                  </button>
                  {date.selectedSlot && (
                    <div>
                      <div>
                        Selected Slot: {date.selectedSlot === 'morning' ? (
                          `${date.morningSlot[0].format('hh:mm A')} - ${date.morningSlot[1].format('hh:mm A')}`
                        ) : (
                          `${date.afternoonSlot[0].format('hh:mm A')} - ${date.afternoonSlot[1].format('hh:mm A')}`
                        )}
                      </div>
                    </div>
                  )}
                </div>
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
