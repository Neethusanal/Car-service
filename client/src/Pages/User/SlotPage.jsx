import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import Navbar from '../../Components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { handleBookingData } from '../../Services/UserApi';



export const SlotPage = () => {
  const user= useSelector((state) => state.user)
  const [selectedSlot, setSelectedSlot] = useState(null);
  const[availableslots,setAvailableSlots]=useState([])
  const [address,setAddress]=useState([])
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigate=useNavigate()
  const location = useLocation();
  const expertmechanic = location.state?.mechanic;
  useEffect(()=>{
    setAddress(user.address)
    
  },[])

  console.log(address,"address")
  
  useEffect(()=>{

    const currentDate = new Date();

const filteredSlots = expertmechanic?.slots.filter(slot => {
  // const slotDate = new Date(slot);
  // console.log(slotDate)
  var dateParts = slot.match(/(\w+) (\d+)(st|nd|rd|th) (\d+), (\d+):(\d+):(\d+) (am|pm)/i);

var month = dateParts[1];
var day = dateParts[2];
var year = dateParts[4];
var hour = dateParts[5] % 12 + (dateParts[8].toLowerCase() === "pm" ? 12 : 0);
var minute = dateParts[6];
var second = dateParts[7];

var date = new Date(year, getMonthIndex(month), day, hour, minute, second);
console.log(date)
  return date > currentDate;
});
console.log(filteredSlots)
  
    setAvailableSlots( filteredSlots)
  },[])

  function getMonthIndex(month) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(month);
  }
  console.log(availableslots,"dataaaaaaaaaaaa")
 
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };
  const handleAddressSelection = (item) => {
    setSelectedAddress(item);
  };

  const handleNewAddress=()=>{
    navigate('/profile')
  }
  const handleBooking = () => {
    // Handle the booking logic here
    if (selectedSlot && selectedAddress) {
     
      console.log(selectedSlot,selectedAddress,);
      handleBookingData({selectedSlot,selectedAddress,expertmechanic}).then((res)=>{
        console.log(res.data)
        if(res.data.success)
        {
          navigate('/payment')
        }
      })
    }
  };

  return (
 
    <>
         <Navbar/>
         <form>
         <Card className="mt-20 w-auto">
        <CardHeader color="gray" className="text-white">
          <Typography className="text-center font-bold text-lg">Select your slot</Typography>
        </CardHeader>
        <CardBody>
          <div className="">
            {availableslots.map((slot, index) => (
              <div key={index} className="mt-4">
                <input
                  type="radio"
                  id={`slot-${index}`}
                  name="slot"
                  value={slot}
                  checked={selectedSlot === slot}
                  onChange={() => handleSlotSelection(slot)}
                />
                <label htmlFor={`slot-${index}`} className="ml-2">
                  {slot}
                </label>
              </div>
            ))}
            
          </div>
        </CardBody>

      </Card>
      <Card>
  <CardHeader color="gray" className="text-white">
    <Typography className="text-center font-bold text-lg"> Pickup Address</Typography>
  </CardHeader>
 <CardBody>
 {address.map((item, index) => (
  <div key={index} className="mt-4">
    <input
      type="radio"
      id={`address-${index}`}
      name="address"
      value={item}
      checked={selectedAddress === item}
      onChange={() =>handleAddressSelection(item)}
    />
    <label htmlFor={`address-${index}`} className="ml-2">
      {item}
    </label>
  </div>
))}

    <div className="mt-4">
      <button
        id="new-address"
        onClick={() =>handleNewAddress()}
        className="icon-button"
      >
        <FaPlus />
      </button>
      <label htmlFor="new-address" className="ml-2">
        Add New Address
      </label>
    </div>
  </CardBody>
</Card>

      <Button
              color="indigo"
              buttonType="filled"
              size="regular"
              className="mt-4"
              onClick={handleBooking}
              disabled={!selectedSlot}
            >
            Continue to checkout
            </Button>
      </form>
      </>

  );
};
