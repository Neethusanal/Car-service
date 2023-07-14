import { Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { userChats } from "../../Services/UserApi";
import { ChatConversations } from "../../Components/conversation/ChatConversations";

export const Chat = () => {
  const socket = useRef();
  const user= useSelector((state) => state.user)
 
  const location = useLocation();
  const { mechanic} = location.state;
  const [chats ,setChats]=useState([])
  console.log(user)
 useEffect(()=>{

  const getChats=async()=>{
    try{
        const {data}=await userChats(user.id)
        console.log(data,"ddd")
        setChats(data)
    }catch(err)
    {
      console.log(err)
    }
  }
getChats()
 },[user])

  return (
    <>
      <div className="container">
      <div className=" mt-4 flex h-screen">
          {/* leftside chat */}
        <div className="bg-white w-1/3">
          {/* search componnet here */}
          <div className="chat-container">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <div className="chatList">
         {chats.map((chat) => {
          return(

          
            <div>
              < ChatConversations />
              </div>

          )
          })
          
        }
        </div>
        </div>
        </div>
        <div className=" flex flex-col bg-blue-50 w-2/3 p-2">
          <div className="flex-grow "> messages with the selected person</div>
          <div className="flex gap-2 mx-2">
            <input
              type="text"
              placeholder="Type your message here"
              className="bg-white flex-grow border rounderd-sm p-2"
            />
            {/* <Button onClick={() => handleSendChat()}> */}
              <FiSend />
            {/* </Button> */}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
