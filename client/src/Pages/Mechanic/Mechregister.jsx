import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Mechanicregister } from "../../Services/MechanicApi";


const Mechregister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()



  const handleregistration = async (e) => {
    e.preventDefault();
    try {

      console.log(name, email, phone)


      Mechanicregister({
        name: name,
        email: email,
        password: password,
        phone: phone,
      })
        .then((response) => {
         
          if (response.status = 'success') {
            navigate('/mechanic/Otp')
          }





        }).catch((error) => {
          console.log(error)
        });

    }




    catch (error) {

    }
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-400">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-black-600">Register</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={(e) => { handleregistration(e) }}>
            <div>
              <label
                htmlFor="name"
                className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text" placeholder="Username"
                  name="name" onChange={(e) => setName(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Phone Number
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text" placeholder="+91"
                  name="phone" onChange={(e) => setPhone(e.target.value)}
                  className="block w-full mt-1 bo(rder-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                  type="email" placeholder="name@example.com"
                  name="email" onChange={(e) => setEmail(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password" placeholder="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password" onChange={(e) => setPassword(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4"><Link to='/mechanic/login'>
              <a
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="#"
              >
                <span>Already have an account? Login </span>
              </a></Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mechregister;
