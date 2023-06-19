import React, { useEffect, useState } from 'react'


import { getUserBrands } from '../Services/UserApi';
export const UserBrands = () => {
    const [brands,setBrands]=useState([])
    useEffect(()=>{
        getBranddata()
    },[])
    const getBranddata=()=>{
        getUserBrands().then((res)=>{
            if(res.data.success)
            {
                setBrands(res.data.result)
            }

        })
    }
  return (
    <>
  <div className="px-5">
        <p className="font-extrabold">Brands We Serve</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {brands.map((item, index) => {
          return (
            <div key={index} className="w-64 h-56 mx-4 my-4 md:w-48 md:h-40 sm:w-40 sm:h-36">
              <img src={item.image} alt={item.brandName} className="w-full h-full object-contain" />
            </div>
          );
        })}
      </div>
    </>
  )
}
