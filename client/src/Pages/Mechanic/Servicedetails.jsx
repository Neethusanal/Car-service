import React, { useEffect, useState } from "react";
import { bookingData, updatedServices } from "../../Services/MechanicApi";

const Servicedetails = () => {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    getBookingDetails();
  }, [status]);

  const getBookingDetails = () => {
    bookingData().then((res) => {
      setServices(res.data.result);
    });
  };

  const updateStatus = (id, newStatus) => {
    updatedServices({ id, newStatus }).then((res) => {
      setServices(prevServices => prevServices.map(service => {
        if (service._id === id) {
          return {
            ...service,
            service_status: {
              ...service.service_status,
              [newStatus.toLowerCase()]: { state: true },
            },
          };
        }
        return service;
      }));
      setStatus(res.data.status);
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Booked Services</h1>
      {services?.map((service, index) => {
        return (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">
              {service.vehicleModel} - {service.vehicleBrand}
            </h2>
            {service?.serviceselected?.map((data, index) => (
              <p key={index} className="mb-2">
                Service: <strong>{data}</strong>
              </p>
            ))}
            <p className="mb-2">
              Booked Slots: <strong>{service.bookedSlot}</strong>
            </p>
            {service.service_status.pickup.state && (
              <p className="mb-2">Status: <strong>Pickup</strong></p>
            )}
            {service.service_status.onService.state && (
              <p className="mb-2">Status: <strong>On Service</strong></p>
            )}
            {service.service_status.servicecompleted.state && (
              <p className="mb-2">Status: <strong>Service Completed</strong></p>
            )}
            {service.service_status.dropped.state && (
              <p className="mb-2">Status: <strong>Delivered</strong></p>
            )}
            <div className="mb-2">
              User Details:
              <ul>
                <li><strong>Name:</strong> {service.user.name}</li>
                <li><strong>Email:</strong> {service.user.email}</li>
                <li><strong>Phone Number:</strong> {service.user.mobile}</li>
              </ul>
            </div>
            <div className="flex space-x-4">
              {!service.service_status.pickup.state &&
                !service.service_status.onService.state &&
                !service.service_status.servicecompleted.state &&
                !service.service_status.dropped.state && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateStatus(service._id, "Pickup")}
                  >
                    For Pickup
                  </button>
                )}

              {service.service_status.pickup.state &&
                !service.service_status.onService.state &&
                !service.service_status.servicecompleted.state &&
                !service.service_status.dropped.state && (
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateStatus(service._id, "On Service")}
                  >
                    On Service
                  </button>
                )}

              {service.service_status.pickup.state &&
                service.service_status.onService.state &&
                !service.service_status.servicecompleted.state &&
                !service.service_status.dropped.state && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateStatus(service._id, "Service Completed")}
                  >
                    Service Completed
                  </button>
                )}

              {service.service_status.pickup.state &&
                service.service_status.onService.state &&
                service.service_status.servicecompleted.state &&
                !service.service_status.dropped.state && (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateStatus(service._id, "Delivered")}
                  >
                    Delivered
                  </button>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Servicedetails;
