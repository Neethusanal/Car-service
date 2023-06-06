import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Images/logo.png'
import mechimage from '../../Images/mechimage.jpg'
import { useDispatch, useSelector } from "react-redux";
import { setmechanicDetails } from "../../Redux/MechanicSlice"
import { useState } from "react";
import { mechanicSignin } from "../../Services/MechanicApi";
import Swal from "sweetalert2"

const Mechlogin = () => {
  const mechanic = useSelector((state) => state.mechanic);
  const [errors, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("mechanictoken")) {
      navigate('/')

    }
  }, [])
  const handleSubmit = async (e) => {
    console.log("entered")
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
      const {data}= await mechanicSignin({ ...values })
      console.log(data)
      if (data.success) {
        localStorage.setItem("mechanictoken", data.token)

        dispatch(
          setmechanicDetails({
            name: data.mechanic.name,
            //  id: mechanic._id,
            email: data.mechanic.email,


          }))
          Swal.fire(data.message)


        navigate("/mechanic/home");

      }
      else
      {
        Swal.fire(data.errors.message)
      }
    } catch (err) {
      Swal.fire(err.message)
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center ">
          <img
            src={mechimage}
            alt="Image"
            className="max-h-full width-full  "
          />
        </div>





        <div className="w-full md:w-1/2 bg-white">
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

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-purple-600"
                  >
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
                  <Link to="/mechanic/register">Sign up</Link>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mechlogin;
