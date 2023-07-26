import React, { useEffect, useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { getAllMechanic, getAllUsers, getBookingData } from '../../Services/AdminApi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
export const Admindashboard = () => {
  const [bookingdata, setBookingData] = useState([]);
  const [allBooking, setAllBooking] = useState(0);
  const [user,setUser]=useState([])
  const [mechanic,setMechanic]=useState([])
  const [deliveredBookingsCount,setDeliveredBookingsCount]=useState()


  useEffect(() => {
    bookingDetails();
  }, []);
  const bookingDetails = async () => {
    try {
      const res = await getBookingData();
      const bookings = res.data.result;

      setBookingData(bookings);
      setAllBooking(bookings.length);

      // Filter bookings with status "delivered" and get the count
      const deliveredBookings = bookings.filter((booking) => booking.service_status.servicecompleted.state);
      setDeliveredBookingsCount(deliveredBookings.length);
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
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
  

  
  const booking = {
    labels:['allBooking','deliveredBookingsCount'],
    datasets: [
      {
       
        data: [allBooking,deliveredBookingsCount],
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
       <div className="flex-1">
        <div className="p-4">
          <h3 className="text-xl pt-20 font-bold mb-">Welcome to the Admin Dashboard!</h3>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="flex p-4 justify-start w-full md:w-1/2">
          <div className="bg-gray-100 p-4 rounded-lg mb-4 w-full">
            <h4 className="text-lg pt-4 font-semibold mb-2">Number of User:</h4>
            <p className="text-gray-600">
              <Pie data={datas} />
            </p>
          </div>
        </div>
        <div className="flex p-4 justify-start w-full md:w-1/2">
          <div className="bg-gray-100 p-4 rounded-lg mb-4 w-full">
            <h4 className="text-lg pt-4 font-semibold mb-2">Bookings :</h4>
            <Doughnut data={booking} />
          </div>
        </div>
      </div>
    </>
 
  );
};
