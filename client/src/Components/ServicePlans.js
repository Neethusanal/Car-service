import React, { useEffect, useState } from "react";
import { addPlansToCart, getServicePlans, getUserServices } from "../Services/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Redux/UserSlice";




export const ServicePlans = () => {
  const [services, setServices] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedPlans, setSelectedPlans] = useState({});
  const[basicPay,setBasicPay]=useState()
  const dispatch=useDispatch()
  const user= useSelector((state) => state.user)

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = () => {
    getUserServices().then((res) => {
      if (res.data.success) {
        setServices(res.data.result);
        if (res.data.result.length > 0) {
          setSelectedServiceId(res.data.result[0]._id); // Set the first service ID as default
          getServicePlans(res.data.result[0]._id).then((plansRes) => {
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

    getServicePlans(id).then((res) => {
      if (res.data.success) {
        const plans = res.data.result;
        setServiceList(plans);
      }
    });
  };

  const handleAddtoCart = (planId, selectedServiceId) => {
    console.log(planId, selectedServiceId,"id")
  

    addPlansToCart({selectedServiceId, planId}).then((res) => {
      if (res.data.success) {
        dispatch(
          setUserDetails({
            ...user,
            cart: res.data.result.cart,
            cartTotal: res.data.cartTotal,
          })
        );
        setBasicPay(res.data.result.cart.basicPay);
      }
    }).catch((error)=>{
      console.log(error)
    })
  };
  // const handleAddtoCart = (planId) => {
  //   // Update the cart with the latest clicked plan for the selected service ID
  //   setSelectedPlans((prevSelectedPlans) => ({
  //     ...prevSelectedPlans,
  //     [selectedServiceId]: planId,
  //   }));
  
  //   // Send the updated cart to the backend
  //   const updatedCart = {
  //     [selectedServiceId]: planId,
  //   };
  
  //   addPlansToCart(updatedCart).then((res) => {
  //     if (res.data.success) {
  //       console.log(res.data);
  
  //       dispatch(
  //         setUserDetails({
  //           ...user,
  //           cart: res.data.result.cart,
  //           cartTotal: res.data.cartTotal,
  //         })
  //       );
  //       setBasicPay(res.data.result.cart.basicPay);
  //     }
  //   });
  // };
  

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
        <ul className="flex flex-col font-black p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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

  {selectedServiceId && (
        <div className="">
          {serviceList.map((plans) => {
            const isSelectedPlan =
              selectedPlans[selectedServiceId] === plans._id;

            return (
              <div
                // className={`w-auto border border-gray-500 bg-white ${
                //   isSelectedPlan ? "bg-blue-200" : ""
                // } p-2 rounded-md shadow-md`}
                className=" mt-4 mb-2 ml-4 mr-4  border border-gray-500"
                key={plans._id}
              >
                <div className="h-10 bg-white border border-gray-300 p-2 rounded-t-md">
                  <h2 className="text-black font-extrabold">
                    {plans.servicelistName}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 ml-4">
                  {plans.description.map((item, index) => (
                    <p key={index} className="text-black font-thin">
                      {item}
                    </p>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 ml-4">
                  <h2 className="text-black font-semibold">
                    Rs {plans.price}
                  </h2>
                  {isSelectedPlan ? (
                    <p className="text-blue-500 font-semibold">
                      Plan selected
                    </p>
                  ) : (
                    <button
                      onClick={() => handleAddtoCart(plans._id,plans.serviceName)}
                      className="px-4 py-2 mb-2 mr-2 bg-green-400 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
  
  </> 
);
};