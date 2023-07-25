import React, { useEffect, useState } from 'react';
import {  Typography, Button } from "@material-tailwind/react";
import Modal from "react-modal";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { deleteAddress, handleBookingData, updateAddress } from '../../Services/UserApi';
import { setUserDetails } from '../../Redux/UserSlice';
import Swal from "sweetalert2";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%", // Adjust the maximum width as needed
    width: "400px", // Set a fixed width or use percentage
  },
};


export const SlotPage = () => {
  const user = useSelector((state) => state.user)
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableslots, setAvailableSlots] = useState([])
  const [address, setAddress] = useState([])
  const [newaddress, setNewAddress] = useState()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [deleted,setDeleted]=useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation();
  const expertmechanic = location.state?.mechanic;
  useEffect(() => {
    setAddress(user.address)

  }, [user,address,deleted])
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }



  useEffect(() => {

    const currentDate = new Date();

    const filteredSlots = expertmechanic?.slots.filter(slot => {
      // const slotDate = new Date(slot);

      var dateParts = slot.match(/(\w+) (\d+)(st|nd|rd|th) (\d+), (\d+):(\d+):(\d+) (am|pm)/i);

      var month = dateParts[1];
      var day = dateParts[2];
      var year = dateParts[4];
      var hour = dateParts[5] % 12 + (dateParts[8].toLowerCase() === "pm" ? 12 : 0);
      var minute = dateParts[6];
      var second = dateParts[7];

      var date = new Date(year, getMonthIndex(month), day, hour, minute, second);
      // console.log(date)
      return date > currentDate;
    });
    console.log(filteredSlots, "filteredslotssssssssss")

    setAvailableSlots(filteredSlots)
  }, [])

  function getMonthIndex(month) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.indexOf(month);
  }

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };
  const handleAddressSelection = (item) => {
    setSelectedAddress(item);
  };

  const handleNewAddress = () => {
    navigate('/profile')
  }
  const handleBooking = () => {
    // Handle the booking logic here
    if (selectedSlot && selectedAddress) {

      console.log(selectedSlot, selectedAddress,);
      handleBookingData({ selectedSlot, selectedAddress, expertmechanic }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          navigate('/payment', { state: { expertmechanic } });
        }
      })
    }
  };
  const handleEditAddress = (addressToEdit) => {

    console.log(addressToEdit, "jjjjjjjjjjjjjj")
    setNewAddress(addressToEdit)
    openModal()
  };
  const editAddress = (e) => {
    e.preventDefault()
    closeModal()
console.log("hhhhhhhhhhhhhh")
    updateAddress({newaddress}).then((res) => {
      console.log(res.data.result.address)
      dispatch(
        setUserDetails({

          ...user, address:[...res.data.result.address]


        }))
    })

  }

  // Function to handle deleting an address
  const handleDeleteAddress = (addressToDelete) => {
    console.log(addressToDelete)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
          let { data } = await deleteAddress({addressToDelete})
          if (data.success) {
            console.log(data,"ddddddddddaaaaaaaaataaaaaaaaaaaaaa")
            setDeleted(true)
              Swal.fire(
                  'The item has be Removed',
                  dispatch(
                    setUserDetails({
            
                      ...user, address:[data.result.address],bookedAddress:[data.result.bookedAddress]
            
            
                    }))
              )
              console.log(user,"nwdata")
          }
      }
    })

   
    // Implement your logic here to handle deleting the address
    // You can show a confirmation modal and remove the address from the state if confirmed
    // setAddress((prevAddresses) => prevAddresses.filter((address) => address !== addressToDelete));
  };
console.log((address,"add"))
  return (

    <>

      <form>
        <div className="mt-10 mb-10 w-auto ml-4">
          <div >
            <Typography className="  mt-2 font-bold text-lg">Select your slot</Typography>
          </div>
          <div>
            <div className="">
              {availableslots?.map((slot, index) => (
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
          </div>

        </div>
        {/* for address */}
        <div className='ml-4'>
          <div >
            <Typography className="font-bold text-lg">Pickup Address</Typography>
          </div>
          <div>
            {address?.map((item, index) => (
              <div key={index} className="flex items-center mt-4">
                <input
                  type="radio"
                  id={`address-${index}`}
                  name="address"
                  value={item}
                  checked={selectedAddress === item}
                  onChange={() => handleAddressSelection(item)}
                />
                <label htmlFor={`address-${index}`} className="ml-2">
                  {item}
                </label>
                <button
                  className="ml-auto text-blue-600"
                  type="button"
                  onClick={() => handleEditAddress(item)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 text-red-600"
                  type="button"
                  onClick={() => handleDeleteAddress(item)}
                >
                  Delete
                </button>
              </div>
            ))}


            <div className="mt-4 ">
              <button
                id="new-address"
                onClick={() => handleNewAddress()}
                className="icon-button "
              >
                < FaPlus />
              </button>
              <label htmlFor="new-address" className="ml-2">
                Add New Address
              </label>
            </div>
          </div>
        </div>

        <Button
          color="indigo"
          buttonType="filled"
          size="small"
          className="mt-4 ml-4"
          onClick={handleBooking}
          disabled={!selectedSlot}
        >
          Continue to checkout
        </Button>
      </form>


      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="text-4xl font-bold flex-items-center">Edit Address</div>
          <form onSubmit={editAddress}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-light text-gray-700">
                Address
              </label>
              <textarea
                id="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newaddress}
                onChange={(e) => setNewAddress(e.target.value)}
                required
              />
            </div>

            <button
              type="submit" 
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
            >
              submit
            </button>
            
          </form>
        </Modal>
      </div>
    </>

  );
};
