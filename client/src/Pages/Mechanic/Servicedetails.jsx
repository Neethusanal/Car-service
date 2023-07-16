import React, { useEffect, useState } from "react";
import { bookingData, updatedServices } from "../../Services/MechanicApi";




const Servicedetails = () => {
   
   
  const [services, setServices] = useState([]);

  useEffect(()=>{
    getBookingDetails()
  },[])
  const getBookingDetails=()=>{
    bookingData().then((res)=>{
        console.log(res.data.result)
            setServices(res.data.result)
        
    })
  }
useEffect(()=>{

},[services])
  const updateStatus = (id) => {
         updatedServices (id).then((res)=>{
            console.log(res.data)
            setServices(updatedServices);
         })
      };

//   const updateStatus = (id, newStatus) => {
//     const updatedServices = services.map((service) => {
//       if (service._id === id) {
//         return { ...service, status: newStatus };
//       }
//       return service;
//     });
//     setServices(updatedServices);
//   };




  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Booked Services</h1>
      {services?.map((service,index) => {
        return(
      
        <div
          key={service._id}
          className="border border-gray-300 rounded-lg p-4 mb-4"
        >
          <h2 className="text-lg font-bold mb-2">
            {service.vehicleModel} - {service.vehicleBrand}
          </h2>
          
         {service?.serviceselected?.map((data)=>{
            return(
                <p className="mb-2">
                Service: <strong>{data}</strong>
              </p>  
              
            )
           
         }
         
      )}
          <p className="mb-2">
            Booked Slots: <strong>{service. bookedSlot}</strong>
          </p>
          <p className="mb-2">
            Status: <strong>{service.status}</strong> 
          </p>
          <div className="mb-2">
            User Details:
            <ul>
              <li>
                <strong>Name:</strong> {service.user.name}
              </li>
              <li>
                <strong>Email:</strong> {service.user.email}
              </li>
              <li>
                <strong>Phone Number:</strong> {service.user.mobile}
              </li>
            </ul>
          </div>
           <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => updateStatus(service._id, "Pickup")}
            >
              For Pickup
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
               onClick={() => updateStatus(service._id, "On Service")}
            >
            On service
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
               onClick={() => updateStatus(service._id, "Completed")}
            >
              Service Completed
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
               onClick={() => updateStatus(service._id, "Delivered")}
            >
              Delivered
            </button>
          </div>
        </div> 
      )
      })}
    </div>
  );
};

export default Servicedetails;
