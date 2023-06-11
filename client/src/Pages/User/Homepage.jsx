import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useSelector } from 'react-redux';



export const Homepage = () => {
  const user = useSelector((state) => state.user);
  const [username,setUserName]=useState()
  return (
    <div>
      <Navbar></Navbar>
      <div className="overflow-y-hidden">
      <div className="relative flex justify-center items-center md:justify-start ">
        <img className="hidden lg:block  w-full" src="https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?size=626&ext=jpg&ga=GA1.1.1402361926.1684210687&semt=ais" alt="randeer" />
        <img className="md:block lg:hidden hidden  w-full " src="https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?size=626&ext=jpg&ga=GA1.1.1402361926.1684210687&semt=ais" alt="randeer" />
        <img className="md:hidden w-full " src="https://img.freepik.com/free-photo/muscular-car-service-worker-repairing-vehicle_146671-19605.jpg?size=626&ext=jpg&ga=GA1.1.1402361926.1684210687&semt=ais" alt="randeer" />
        <div className="flex absolute justify-start flex-col md:flex-row items-center">
          <div className=" py-32 sm:py-20  md:hidden" />
          <div className="mt-10  lg:w-auto custom sm:mt-96 md:mt-0 h-full flex px-4 md:px-0  z-10 justify-center items-center md:items-start flex-col md:pl-20 lg:px-20 2xl:px-44">
            <p className="text-xl sm:text-2xl xl:text-4xl text-center md:text-left font-semibold leading-6 xl:leading-10 text-gray-100 md:w-96 2xl:w-2/3">Your message from Santa is waiting!</p>
            <p className="mt-4 md:w-80 lg:w-2/3 xl:w-3/4 text-center md:text-left  text-base leading-normal text-gray-200">Looking to create a greater impact with your commercial Christmas display? Take a look at the services we have on offer...</p>
            <button className="mt-6 shrink-0 w-full md:w-auto  lg:mt-8 py-2 md:py-3 px-10 flex justify-center duration-700  items-center text-base border-2 border-white transition hover:-translate-y-1 hover:bg-gray-100 hover:text-gray-800 font-medium text-white">
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
