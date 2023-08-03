import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter,
  
  } from "@material-tailwind/react";

  import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteItem, getCartData } from '../Services/UserApi';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../Redux/UserSlice';





export const Cart = () => {
  
  const user= useSelector((state) => state.user)
  const [deleted,setDeleted]=useState()
  const[cartTotal,setCartTotal]=useState()
  const [cart,setCart]=useState([])
  const dispatch=useDispatch()
  
  const navigate=useNavigate()
  useEffect(()=>{
   
   getCartItems()

  },[deleted])
  const getCartItems=()=>{
    getCartData().then((res)=>{
      
      setCart(res?.data?.result.cart)
      setCartTotal(res.data.result.cartTotal)
    
    })
  }
 
const deleteCartData= (id)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
        let { data } = await deleteItem(id)
        if (data.success) {
          
          setCart(data.result.cart)
          setCartTotal(data.result.cartTotal)
          setDeleted(id) 
            Swal.fire(
                'The item has be Removed',
                dispatch(
                  setUserDetails({
        
                 ...user,cart:data.result.cart,
                 cartTotal:data.cartTotal,
        
                  }))
                 
              
            )  
        }
    }
  })
 
}
const handleContinue=()=>{
  navigate('/staff')
}

  return (
    <>
    <div className='flex flex-col items-center  mt-24'>

   
   <Card color="gray" variant="gradient" className="w-full max-w-[60rem] p-8 ">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="Black"
          className="font-extrabold-uppercase text-white"
        >
     Shopping Cart
        </Typography>
       
      </CardHeader>
      <CardBody className="p-0">
      <table className="min-w-full divide-y divide-gray-800">
      <thead className="bg-gray-50">
        
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services selected</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            
        </tr>
       
      </thead>
      <tbody className="bg-white divide-y divide-gray-500">
      {cart?.map((data,index)=>{
          return(
        <tr key={index+'sdf'}>
          <td className="px-6 py-4 text-black whitespace-nowrap">{data.servicelistName}</td>
          <td className="px-6 py-4  text-black whitespace-nowrap">{data.price}</td>
          <td >
          
          <button type="submit" class="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
          onClick={()=>deleteCartData(data._id)}>
                 <AiOutlineDelete />
                </button>

          </td>
         
        </tr>
        
           
            )
  
          })}
         
      </tbody>
    </table>
      </CardBody>
      <CardFooter className="mt-12 ">
      <Typography variant="small" color="Black" className="font-extrabold flex justify-end">
      BasicPay:{user?.basicPay}
  </Typography>
  <Typography variant="small" color="Black" className="font-extrabold flex justify-end">
   
    Total: {cartTotal}
  </Typography>
  
  <Button onClick={handleContinue}>Continue</Button>
</CardFooter>
      
    </Card>
    </div>
    </>
  )
}
