import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getLocations, updateUser } from '../Services/UserApi'
import { updateUserLocation } from '../Redux/UserSlice'


export const ServingLocation = () => {
    const user = useSelector((state) => state.user)
    
    const [email,setEmail]=useState()
    const [locData,setLocData]=useState()
    const [locationName, setLocationName] = useState();
    const dispatch = useDispatch();
    useEffect(()=>{
        getLocations().then((res)=>{
            setLocData(res.data.result)
        })
        setEmail(user.email)
        
    },[])
    useEffect(() => {
      if (user?.servicelocation) {
        setLocationName(user?.servicelocation);
      }
    }, [user]);
    const handleChange = (e) => {
      const selectedLocationId = e.target.value;
      const selectedLocation = locData.find((loc) => loc._id === selectedLocationId);
      
      setLocationName(selectedLocationId);
      
      dispatch(updateUserLocation(selectedLocationId)); // Update user location in Redux store
      
      updateUser({ email: user.email, locationName: selectedLocationId }).then((res) => {
        console.log(res.data);
      });
    };
      
      
      

  return (
    <>  
        <div className="mb-2">
          
        <select
          id="items"
          value={locationName}
          onChange={handleChange}
          className="text-white bg-black w-36 px-2 "
          required
        >
          {locData?.map((loc, index) => {
            return (
              <option key={index} value={loc._id}>
                {loc.Locationname}
              </option>
            );
          })}
        </select>
        </div>
       </>
  )
}
