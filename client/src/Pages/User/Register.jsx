import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import { userRegister } from "../../Services/UserApi";
import { showAlertError, showAlertSuccess } from "../../Services/ShowAlertApi";
import { useDispatch } from "react-redux";
import Alerts from "../../Components/Alert";



const Register = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    try{
      console.log(name,mobile,email)
      userRegister({name:name,
        mobile:mobile,
        email:email,
        password:password

    })
    .then((data)=>{
        
            console.log(data)
            showAlertSuccess(dispatch,data.message)
            navigate('/otp')
            
        
       
     
   }).catch((error)=>{
     console.log(error)
     showAlertError(dispatch.data.message)
   })
   

    }catch(error)
    {
      console.log(error)
    }
  };
  return (
    <>
    
    <div>
     
     
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50 ">
         
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-black-600">
                            Customer Registeration
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name" onChange={(e)=>setName(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"onChange={(e)=>setEmail(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Mobile No
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="number"
                                    name="mobile"onChange={(e)=>setMobile(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password" onChange={(e)=>setPassword(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="cpassword"onChange={(e)=>setCpassword(e.target.value)}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <a
                            href="#"
                            className="text-xs text-black-600 hover:underline"
                        >
                            {/* Forget Password? */}
                        </a>
                        <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <a className="text-grey-600 hover:underline" href="#">
                            <Link to="/login">Login</Link>
                            </a>
                        </span>
                    </div>
                   
                    
                </div>
            </div>
        </div>
      <Alerts/>
    </>
  );
};

export default Register;
