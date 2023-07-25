import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import { getServiceHistory } from '../../Services/UserApi';
const TABLE_HEAD = ["Brand", "Model", "Service Selected", "Booked slot", "Bill Amount", "status",];



export const Userservicehistory = () => {
  const user = useSelector((state) => state.user)
  const email = user?.email
  console.log(email)
  const [servicedata, setServiceData] = useState()

  useEffect(() => {
    serviceHistory()

  }, [])
  const serviceHistory = () => {

    getServiceHistory({ email: email })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setServiceData(res.data.servicehistory)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(servicedata)
  return (
    <>

      <div className='mt-5'>
        <Card className=" h-full w-full">
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
              {servicedata?.map((service, index) => {
                const isLast = index === servicedata.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={service._id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.vehicleBrand}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {service.vehicleModel}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="block">
                        {service.serviceselected.map((selectedService) => (
                          <Typography
                            key={selectedService}
                            variant="small"
                            color="blue-gray"
                            className="font-normal mr-4 "
                          >
                            {selectedService}
                          </Typography>
                        ))}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                        {service.bookedSlot}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                        {service.billAmount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                        {service.service_status.dropped.state
                          ? "Delivered"
                          : service.service_status.servicecompleted.state
                            ? "completed"
                            : service.service_status.onService.state
                              ? "on service"
                              : service.service_status.pickup.state
                                ? "Pickup"
                                : ""}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  )
}
