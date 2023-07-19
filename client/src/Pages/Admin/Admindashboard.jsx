import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getBookingData } from '../../Services/AdminApi';

export const Admindashboard = () => {
  const [bookingdata, setBookingData] = useState([]);
  const [allBooking, setAllBooking] = useState(0);

  useEffect(() => {
    bookingDetails();
  }, []);

  const bookingDetails = async () => {
    await getBookingData().then((res) => {
      console.log(res.data);
      setBookingData(res.data.result);
    
    });
  };

  const booking = {
    labels: ['Bookings'],
    datasets: [
      {
        label: 'Bookings',
        data: [allBooking],
        backgroundColor: ['rgba(0, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
        borderColor: ['rgba(0, 255, 0, 1)', 'rgba(255, 0, 0, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="flex-1 ">
        <div className="p-4">
          <h3 className="text-xl pt-24 font-bold mb-">Welcome to the Admin Dashboard!</h3>
          <div className="flex p-4 justify-around">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
              <h4 className="text-lg pt-24 font-semibold mb-2">Number of Bookings:</h4>
              <p className="text-gray-600">
                 {/* <Pie data={booking} />  */}
              </p>
            </div>

            {/* Additional dashboard content goes here */}
          </div>

          {/* Additional dashboard content goes here */}
        </div>
      </div>
    </>
  );
};
