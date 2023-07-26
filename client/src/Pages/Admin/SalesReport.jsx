import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getSalesData } from '../../Services/AdminApi';
import { Card, Typography } from "@material-tailwind/react";
const TABLE_HEAD = ["Brand", "Model", "Service Selected", "UserName", "Bill Amount", ];
export const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
 
 
//   useEffect(() => {
  
//     fetchSalesData(fromDate, toDate)
//       .then(data => setSalesData(data))
//       .catch(error => console.error(error));
//   }, [fromDate, toDate]);

  // Function to fetch sales data from your backend
  const fetchSalesData = async (start, end) => {
    try {
      getSalesData({fromDate,toDate}).then((res)=>{
        
        setSalesData(res.data.result)
      })
    
    } catch (error) {
      throw new Error('Error fetching sales data');
    }
  };
   // Function to handle date range selection and trigger API call
   const handleDateRangeSelection = () => {
    fetchSalesData();
  };
 
  return (
    <>
<div className='flex justify-center items-center h-screen'>
      <div className='bg-gray-100 rounded-lg p-6'>
        <div className='font-extrabold text-xl mb-4'>Sales Report</div>
        <div className='flex justify-center'>
          <div className='mr-4'>
            <DatePicker
              selected={fromDate}
              onChange={date => setFromDate(date)}
              placeholderText='From Date'
            />
          </div>
          <div>
            <DatePicker
              selected={toDate}
              onChange={date => setToDate(date)}
              placeholderText='To Date'
            />
          </div>
        </div>
        <div className='mt-4'>
          <button onClick={handleDateRangeSelection} className='px-4 py-2 bg-blue-500 text-white rounded'>
            Fetch Sales Data
          </button>
        </div>
        <Card className="w-full h-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {salesData.map(( data,index) => {
            const isLast = index === salesData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.user.name}
                  </Typography>
                </td>
                <td className={classes}>
                  {/* <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.serviceselected}
                  </Typography> */}
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.vehicleBrand}
                  </Typography>
                </td>
                <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.vehicleModel}
                  </Typography>
                  </td>
                  <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.billAmount}
                  </Typography>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
    </div>
    </>
  )
}
