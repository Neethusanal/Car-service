import { Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

export const Chat = () => {
  const socket = useRef();
  const currentuser= useSelector((state) => state.user)
 
  const location = useLocation();
  const { mechanic,user } = location.state;
  useEffect(() => {
    if(currentuser)
    {
      socket.current=io(process.env.REACT_APP_BASE_URL)
      socket.current.emit("add-user,currentuser._id")
    }
  }, [currentuser]);
  const handleSendChat = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="bg-white w-1/3">contacts</div>
        <div className=" flex flex-col bg-blue-50 w-2/3 p-2">
          <div className="flex-grow "> messages with the selected person</div>
          <div className="flex gap-2 mx-2">
            <input
              type="text"
              placeholder="Type your message here"
              className="bg-white flex-grow border rounderd-sm p-2"
            />
            <Button onClick={() => handleSendChat()}>
              <FiSend />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
