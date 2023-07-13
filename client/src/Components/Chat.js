import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FiSend } from 'react-icons/fi';
import { useLocation } from "react-router-dom";




export const Chat = () => {
    const location = useLocation();
   
const { mechanic, user } = location.state;
    console.log(user)

    console.log(mechanic)
    
    useEffect(() => {
      
              
      }, []);
      const handleSubmit=()=>{
        
      }
      
   
  return (
    <>
      
      <div className="flex h-screen">
        <div className="bg-white w-1/3">contacts</div>
        <div className=" flex flex-col bg-blue-50 w-2/3 p-2">
          <div className="flex-grow "> messages with the selected person</div>
          <div className="flex gap-2 mx-2">
            <input type="text" placeholder="Type your message here" 
            className="bg-white flex-grow border rounderd-sm p-2"/>
            <Button onClick={()=>handleSubmit()}>
            <FiSend />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
