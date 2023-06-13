import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { userOtpsubmit } from "../Services/UserApi";

import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
export const Userotp = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, indx) => (indx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const sendOTP = async () => {
    try {
      const otpString = otp.join("");
      if (otp.length < 4 || otp === "") {
        Swal.fire("invalid entry");
      } else {
        alert("Sending OTP: " + otpString);
        const { data } = await userOtpsubmit({ otp: otpString });
       
        if (data.success) {
          console.log("jjjjjjjjjjjj");
          Swal.fire(data.message);
          navigate("/login");
        } else if (data) {
          console.log(data, "kkkkkkkkkkk");
          Swal.fire(data.message);
          navigate("/register");
        }
      }
    } catch (data) {
      
      Swal.fire(data.response.data.message);
    }
  };

  return (
    <>
      <div className=" flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Enter the OTP for Registeration
          </h2>
          {otp.map((data, index) => {
            return (
              <input
                className="border border-gray-300 rounded w-10 h-10 mx-1 px-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
          <p>OTP Entered: {otp.join("")}</p>
          <p>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2 mr-2"
              onClick={(e) => setOtp([...otp.map((v) => "")])}
            >
              Clear
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
              onClick={sendOTP}
            >
              Verify OTP
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Userotp;
