import React, { useEffect, useState } from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import { getAllMechanic, getAllUsers, getBookingData } from '../../Services/AdminApi';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import moment from 'moment';
ChartJS.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title)

export const Admindashboard = () => {
  const [bookingdata, setBookingData] = useState([]);
  const [allBooking, setAllBooking] = useState(0);
  const [user,setUser]=useState([])
  const [mechanic,setMechanic]=useState([])


  useEffect(() => {
    bookingDetails();
  }, []);

  const bookingDetails = async () => {
    await getBookingData().then((res) => {
      
      setBookingData(res.data.result);
      setAllBooking(res.data.result.length)
    
    });
  };
  useEffect(()=>{
getAllUsers().then((res)=>{
  console.log(res)
  setUser(res.data.result.length)
})
  },[])
  useEffect(()=>{
    getAllMechanic().then((res)=>{
      console.log(res.data)
      setMechanic(res.data.result.length)
    })
  },[])
  
  const moment = require('moment');

  const bookingsCountByDate = bookingdata.reduce((countByDate, booking) => {
    try {
      const date = moment(booking.bookedSlot);
      console.log(date)
      if (!date.isValid()) {
        console.error('Invalid date:', booking.bookedSlot);
        return countByDate;
      }
      const formattedDate = date.format('M/D'); // Format the date as 'Month/Day'
      countByDate[formattedDate] = (countByDate[formattedDate] || 0) + 1;
    } catch (error) {
      console.error('Error parsing date:', error);
    }
    return countByDate;
  }, {});

  
  

  const labels = Object.keys(bookingsCountByDate);
  const data = Object.values(bookingsCountByDate);
  console.log(bookingsCountByDate,"bbbbbbbb")

  const booking = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const datas = {
    labels: ['Mechanic','user'],
    datasets:[
      {
        label:'Resorts',
        data:[mechanic,user],
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 0, 0, 0.2)',
        
        
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)', 
          'rgba(255, 0, 0, 1)', 
        
        
        ],
        borderWidth: 1,
      },
    ]
  };

  return (
    <>
      <div className="flex-1 ">
        <div className="p-4">
          <h3 className="text-xl pt-24 font-bold mb-">Welcome to the Admin Dashboard!</h3>
          <div className="flex p-4 justify-start">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">

              <h4 className="text-lg pt-20 font-semibold mb-2">Number of User:</h4>
              <p className="text-gray-600">
              <Pie data={datas} />
              </p>
            </div>
          </div>
        </div>
    


      {/* Doughnut chart */}
    
  
    
      <div className="flex p-4 justify-start">
        <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
          <h4 className="text-lg pt-20 font-semibold mb-2">Number of Bookings per Date:</h4>
          <Doughnut data={booking} />
        </div>
      </div>
      </div>
    </>
   
  );
};
