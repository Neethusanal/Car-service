import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from '../../Redux/UserSlice'


import logo from '../../Images/logo.png'
import { userSignin } from '../../Services/UserApi';

const Login = () => {

  const [errors, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!values.email) {
      console.log("em")
      setError("Email is required");
      return;
    }
    if (!values.password) {
      console.log("pas")
      setError("Password is required");
      return;
    }

    try {
      userSignin({ ...values }).
        then((res) => {
          console.log(res, "nnnnn")
          if (res.data.success) {

            localStorage.setItem("usertoken", res.data.token)

            dispatch(
              setUserDetails({
                name: res.data.name,
                email: res.data.email,
                mobile: res.data.mobile,
                cart: res.data.cart,
                servicelocation:res.data?.servicelocation || null,
                brand:res.data.brand,
                model:res.data.model,
                address:res.data.address,
                cartTotal:res.data.cartTotal,
                


              }))
            navigate("/home");
          }



        })

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>



      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-4 m-auto bg-white rounded-md shadow-xl shadow-slate-600/40 ring ring-2 ring-gray-600 lg:max-w-md">
          <img src={logo} alt="Logo" className="h-20 w-15" />
          <h1 className="text-3xl font-semibold text-center text-black-700 underline uppercase decoration-normal">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="email" onChange={(e) =>
                  setValues({ ...values, email: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }

                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a
              href="#"
              className="text-xs text-black-600 hover:underline"
            >
              Forget Password?
            </a>
            <div className="mt-6">
              <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-purple-600">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?
            <a
              href="#"
              className="font-medium text-black-600 hover:underline"
            >
              <Link to="/register">Sign up</Link>
            </a>
          </p>
        </div>
      </div>


    </>
  )
}

export default Login