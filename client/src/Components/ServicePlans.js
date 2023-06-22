import React, { useEffect, useState } from "react";
import { addPlansToCart, getServicePlans, getUserServices } from "../Services/UserApi";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { Cart } from "./Cart";

export const ServicePlans = () => {
  const [services, setServices] = useState([]);
  const [servicelist,setServiceList]=useState([])
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedPlans, setSelectedPlans] = useState({});
  const[selectedPlanId,setSelectedPlanId]=useState()
  useEffect(() => {
    getAllServices();
   
  }, []);
  const getAllServices = () => {
    getUserServices().then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setServices(res.data.result);
        if (res.data.result.length > 0) {
          setSelectedServiceId(res.data.result[0]._id); // Set the first service ID as default
          getServicePlans(res.data.result[0]._id).then((plansRes) => {
            console.log(plansRes.data.result, "response from backend");
            if (plansRes.data.success) {
              setServiceList(plansRes.data.result);
            }
          });
        }
      }
    });
  };
  const handleServicePlans = (id) => {
    setSelectedServiceId(id); 
    getServicePlans(id).then((res)=>{
      console.log(res.data.result,"response from backend")
      if(res.data.success )
      {
        setServiceList(res.data.result)
        
      }

    })
  };
  const handleAddtoCart = (planId) => {
    console.log(planId, "addtocart");
    addPlansToCart(selectedServiceId, planId).then((res) => {
      console.log(res.data.result);
    });
  
    setSelectedPlans((prevSelectedPlans) => ({
      ...prevSelectedPlans,
      [selectedServiceId]: planId,
    }));
  };
  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <button
        data-collapse-toggle="navbar-multi-level"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-multi-level"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {services.map((service, index) => {
            return (
              <li key={service._id}>
                <button
                  className="py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => handleServicePlans(service._id)}
                >
                  {service.serviceName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </nav>
  <div className="flex flex-wrap">
    {selectedServiceId && (
      <div className="flex sticky top-0 flex-wrap md:flex-nowrap">
        {servicelist.map((plans, index) => {
          return (
            <div className="w-full md:w-1/3 px-5 py-20" key={index}>
              <Card
                className={`w-auto white ${
                  selectedPlans[selectedServiceId] === plans._id
                    ? "bg-blue-200"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedPlanId(plans._id)}
              >
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="h-96 bg-gray-300  overflow-y-auto"
                >
                  <ul className="text-center list-disc">
                    {plans.description.map((item, index) => {
                      return (
                        <li key={index} className="my-1">
                          <p className="text-black font-serif">{item}</p>
                        </li>
                      );
                    })}
                  </ul>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center justify-between mb-2">
                    <Typography
                      color="blue-gray"
                      className="font-extrabold text-black"
                    >
                      {plans.servicelistName}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="font-extrabold"
                    >
                      {plans.price}
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className={`bg-black text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100 ${
                      selectedPlans[selectedServiceId] &&
                      selectedPlans[selectedServiceId] !== plans._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleAddtoCart(plans._id)}
                    disabled={
                      selectedPlans[selectedServiceId] &&
                      selectedPlans[selectedServiceId] !== plans._id
                    }
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
    )}
   
    <Cart />
    
   
  </div>
  </>
);
};