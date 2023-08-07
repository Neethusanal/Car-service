import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, userOtpsubmit } from "../Services/UserApi";
import Swal from "sweetalert2";
export const Userotp = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpexpTime,setOtpExpTime]=useState()
 
  const location = useLocation();
  console.log(location,"looo")
    const resendemail = location.state?.email;
    const otpExp=location.state?.expTime
    console.log(resendemail,"nnnnnnn")
    console.log(otpExp,"kkkkkk")
  const navigate = useNavigate();

  useEffect(() => {
    // Set focus to the first input field on initial load
    const firstInput = document.getElementById("otp-0");
    if (firstInput) {
      firstInput.focus();
    }
    const expirationTimeInMinutes = location.state?.expTime;
    if (expirationTimeInMinutes) {
      const expirationTimeInMilliseconds = expirationTimeInMinutes * 60 * 1000;
      setOtpExpTime(expirationTimeInMilliseconds);
    }
  }, [location.state]);

  useEffect(() => {
    // Start the countdown timer if the expiration time is greater than 0
    if (otpexpTime > 0) {
      const interval = setInterval(() => {
        setOtpExpTime((prevTime) => prevTime - 1000); // Decrease the time by 1 second

        if (otpexpTime <= 0) {
          clearInterval(interval);
          Swal.fire("The OTP has expired. Please request a new one if needed");
          // You may also navigate to another page here if needed
        }
      }, 1000);

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [otpexpTime]);
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
        // alert("Sending OTP: " + otpString);
        const { data } = await userOtpsubmit({ otp: otpString });
        
        if (data.success) {
          Swal.fire(data.message);
          navigate("/login");
        } else if (data) {
          Swal.fire(data.message);
          navigate("/register");
        }
      }
    } catch (data) {
      Swal.fire(data.response.data.message);
    }
  };
  const handleResendOtp=()=>{

    resendOtp({resendemail}).then((res)=>{
      
    })
  }

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
          
          <p>Time remaining: {Math.ceil(otpexpTime / 1000)} seconds</p>
          
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
            
         
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
              onClick={handleResendOtp}
            >
              Resend OTP
              
            </button>
       
         
        </div>
      </div>
    </>
  );
};

export default Userotp;
