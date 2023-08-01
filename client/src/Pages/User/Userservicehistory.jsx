import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import { getServiceHistory } from '../../Services/UserApi';
const TABLE_HEAD = ["Brand", "Model", "Service Selected", "Booked slot", "Bill Amount", "status",];



export const Userservicehistory = () => {
  const user = useSelector((state) => state.user)
  const email = user?.email
  const [servicedata, setServiceData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    serviceHistory()

  }, [currentPage])
  const serviceHistory = (page) => {
    const limit = 5; // Choose the number of items per page (you can adjust this as needed)
  
    getServiceHistory({ email: email, page: currentPage, limit: limit })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data)
          setServiceData(res.data.servicehistory);
          setTotalPages(res.data.servicehistory.totalPages);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSearchChange = (event)=>{
    setSearchTerm(event.target.value);
    console.log(searchTerm)
   
  }
  
  


  return (
    <>
    

      <div className='mt-5'>
        <Card className=" h-full w-full">
        <div className="flex justify-between px-4 pt-4 pb-2">
            <div className="w-2/5">
              <input
                type="text"
                placeholder="Search by brand..."
                className="px-2 py-1 border rounded w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="w-3/5 text-right"> 
              {/* <button
                onClick={() => handleSortChange("vehicleBrand")}
                className="px-2 py-1 border rounded"
              >
                Sort by Brand
              </button> */}
              {/* Add similar buttons for other columns if needed */}
            </div>
          </div>
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
            {servicedata
              ?.filter((service) => {
                // Filter services based on the brand search term
                if (searchTerm === '') return true; // If searchTerm is empty, show all services
                return service.vehicleBrand.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((service, index) => {
                // Rest of the mapping remains unchanged
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
        <div className="flex items-center justify-center mt-4">
      <button
        className="px-2 py-1 mr-2 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
      >
        Previous
      </button>
      <span className="px-2 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-2 py-1 ml-2 border rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
      >
        Next
      </button>
    </div>
      
    </div>
    </>
  )
}