import React, { useEffect, useState } from 'react'
import { getUserBanners } from '../Services/UserApi';

export const UserBanner = () => {
    
    const [banner,setBanner]=useState([])
 
    useEffect(() => {
        getAllBanner();
       
      
    }, []);
    const getAllBanner=()=>{
        getUserBanners().then((res) => {
           
           
            if (res.data.success) {
            
              setBanner(res?.data?.result);
            }
          })
        
        
    }
  return (
    <>
    {banner.map((item,index)=>{
        return(
            <div className="overflow-y-hidden">
      <div className="relative flex justify-center items-center md:justify-start ">
        <img className="hidden lg:block  w-full" src={item.image} alt="" />
        <img className="md:block lg:hidden hidden  w-full " src={item.image} alt="" />
        <img className="md:hidden w-full " src={item.image} alt="" />
        <div className="flex absolute justify-start flex-col md:flex-row items-center">
          <div className=" py-32 sm:py-20  md:hidden" />
          <div className="mt-10  lg:w-auto custom sm:mt-96 md:mt-0 h-full flex px-4 md:px-0  z-10 justify-center items-center md:items-start flex-col md:pl-20 lg:px-20 2xl:px-44 ">
            <p className="text-xl sm:text-2xl xl:text-4xl text-center md:text-left font-extrabold  leading-6 xl:leading-10  md:w-96 2xl:w-2/3">{item.bannerName}</p>
            <p className="mt-4 md:w-80 lg:w-2/3 xl:w-3/4 text-center md:text-left  text-base leading-normal text-white-200">{item.description}</p>
           
          </div>
        </div>
      </div>
    </div>

        )
    })}
   
    </>
  )
}
