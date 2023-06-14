import React, { useEffect, useState } from "react";
import { getUserServices } from "../Services/UserApi";

export const UserServices = () => {
  const [services, SetService] = useState([]);
  useEffect(() => {
    getServiceData();
  }, []);
  const getServiceData = () => {
    getUserServices().then((res) => {
      console.log(res.data);
      if (res.data.success) {
        SetService(res.data.result);
      }
    });
  };
  console.log(services, "data");
  return (
    <>
<div className="flex h-screen">
   
       
        <div className="mx-auto container py-8 h-auto w-auto grid grid-cols-3 gap-4 ">
          {services.map((items, index) => {
            return (
              <div key={index} className="mx-2 my-2 py-1 border border-gray-500  h-40 w-36 " >
                <div className="  flex items-center justify-center ">
                  <img src={items.image} className="w-24 h-20 " /> 
                </div>
                <p className=" flex items-center justify-center font-serif">{items.serviceName}</p>
              </div>
            );
          })}
        </div>
   
      
     
      </div>
    </>
  );
};
