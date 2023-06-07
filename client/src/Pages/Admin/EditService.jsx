import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateService } from '../../Services/AdminApi';
import Swal from "sweetalert2"

export const EditService = () => {
  console.log("editservice page");
  const [serviceName,setServiceName]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDescription]=useState('')
    const location = useLocation();
    const service = location.state?.service;
    const navigate=useNavigate()
    console.log(service,"editservicepage working")
    useEffect(() => {
      console.log("usewffect service");
      setServiceName(service.serviceName)
      setPrice(service.price)
      setDescription(service.description)
    }, []);
    const handleUpdate=(e)=>{
      e.preventDefault();
      updateService({serviceName,
          price,
          description,
      }).then((res) => {
          console.log(res);
          console.log("updateService");
          console.log(res.data);
          if (res.data.success) {
              console.log(res.data.result, "ddddddd");
              setPrice("")
              setServiceName("")
              setDescription("")
              Swal.fire(res.data.message)
              navigate('/admin/services')
          }
          else
          {   console.log("else part executing")
              Swal.fire(res.data.message)
            
          }
      });
  }
  

  return (
    <div>
      <div class="flex flex-col items-center border-2 border-gray-600 p-6 mt-28  mx-auto max-w-md">
    <div class="text-4xl font-bold flex-items-center">Edit Services</div>
    <form onSubmit={handleUpdate} >
        <div class="mb-4">
            <label for="brand" class="block font-bold mb-1">
                Brand Name
            </label>
            <input type="text" id="brand" name="brand" value={serviceName}  onChange={(e) => setServiceName(e.target.value)} class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mb-4">
            <label for="basic_pay" class="block font-bold mb-1">
                Basic Pay
            </label>
            <input type="text" id="basic_pay" name="basic_pay" value={price}  onChange={(e) => setPrice(e.target.value)}class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <div class="mb-4">
            <label for="description" class="block font-bold mb-1">
                Description
            </label>
            <input type="text" id="description" name="description" value={description}  onChange={(e) => setDescription(e.target.value)}class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
        </div>
        <button type="submit" class="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false">
            Update
        </button>
    </form>
</div>
    </div>
  )
}
