import React, { useEffect, useState } from "react";
import { authUser, getUserBrands, getUserModel, getUserServices, updateBookingData } from "../Services/UserApi";
import {Card,CardHeader,CardBody,CardFooter,Typography,Button,} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2"
import { useSelector } from "react-redux";

export const UserServices = () => {
  const user= useSelector((state) => state.user)
  const [services, setService] = useState([]);
  const [brand ,setBrand]=useState([])
  const [model,setModel]=useState([])
  const [brandName,setBrandName]=useState(user?.brand)
  const [modelName,setModelName]=useState(user?.model)
  const navigate=useNavigate()
  useEffect(() => {
    getServiceData();
    getBrandData()
    getModelData()
  }, []);
  const getServiceData = () => {
    getUserServices().then((res) => {
      
      if (res.data.success) {
        setService(res.data.result);
      }
    });
  };
  const getBrandData=()=>{
    getUserBrands().then((res) => {
      
      if (res.data.success) {
        setBrand(res.data.result);
      }
    });

  }
  const getModelData=()=>{
    getUserModel().then((res) => {
     
      if (res.data.success) {
        setModel(res.data.result);
      }
    });
  }
  const handleBooking=()=>{
    if(authUser){
    
      updateBookingData({brandName,modelName}).then((res)=>{
    
      })
      navigate('/services')
    }
    else
    {
      Swal.fire("please login")
    }
  
  }
  return (
    <div className="flex flex-col sm:flex-row h-auto">
  <div className="container h-auto sm:w-7/12 py-8 border-gray-900">
    <p className="py-4 ml-4 font-extrabold">Our Services</p>
    <p className="ml-4 font-serif">
       Find the best car service packages for your car. Select from a wide range of car repairs & services, from general service, car wash, accidental repair to custom repairs, cashless insurance claims, and much more.
    </p>
    <div className="mx-auto container ml-4 py-5 h-auto w-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
      {services.map((items, index) => {
        return (
          <div key={index} className="mx-2 my-2 h-40 w-36" >
            <div className="flex items-center justify-center">
              <img src={items.image} className="w-24 h-20" alt={items.serviceName} />
            </div>
            <p className="flex items-center justify-center font-serif">{items.serviceName}</p>
          </div>
        );
      })}
    </div>
  </div>
  <div className="ml-4 mt-4 sm:ml-20 sm:mt-28">
    <Card color="white" variant="gradient" className="w-full max-w-[30rem] p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography>
          A Simpler way to care for your car
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <div className="mb-4">
          <label htmlFor="items" className="block font-bold mb-1">
            Select your Brand
          </label>
          <select
            id="items"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select the brand</option>
            {brand?.map((items, index) => {
              return (
                <option  key={items._id}  value={items.brandName}>{items.brandName}</option>
              )
            })}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="items" className="block font-bold mb-1">
            Select your Model
          </label>
          <select
            id="items"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select the brand</option>
            {model?.map((car, index) => {
              return (
                <option  key={index}  value={car.carName}>{car.carName}</option>
              )
            })}
          </select>
        </div>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color=""
          className="text-black-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
          onClick={()=>handleBooking()}
        >
          Book an appointment
        </Button>
      </CardFooter>
    </Card>
  </div>
</div>

  );
};
