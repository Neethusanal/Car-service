import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Images/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { setadminDetails } from "../../Redux/AdminSlice"
import { useState } from "react";
import { adminSignin } from '../../Services/AdminApi';
import Swal from "sweetalert2"

export const Adminlogin = () => {
  const admin = useSelector((state) => state.admin);
  const [errors, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      navigate('/admin/dashboard')
    }
  }, [])
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!values.email) {

      setError("Email is required");
      return;
    }
    if (!values.password) {

      setError("Password is required");
      return;
    }

    try {
      const { data } = await adminSignin({ ...values })

      if (data.success) {
        localStorage.setItem("admintoken", data.token)

        dispatch(
          setadminDetails({


            email: data.admin.email,


          }))

        navigate("/admin/dashboard");
      }
    } catch (err) {
      Swal.fire(err)
    }
  };
  return (
    <>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input type="email" name="email" onChange={(e) =>
                setValues({ ...values, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input type="password" name="password" onChange={(e) =>
                setValues({ ...values, password: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Login</button>
          </form>
        </div>
      </div>

    </>
  )
}
