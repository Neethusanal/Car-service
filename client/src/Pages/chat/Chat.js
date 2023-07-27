import { Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import { userChats } from "../../Services/UserApi";
import { ChatConversations } from "../../Components/conversation/ChatConversations";
import { ChatBox } from "../../Components/conversation/ChatBox";
import {io} from 'socket.io-client'


export const Chat = () => {
  const socket = useRef();
  const user= useSelector((state) => state.user)
 
 
  const [chats ,setChats]=useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [onlineUsers,setOnlineUsers]=useState([])
  const[sendMessage,setSendMessage]=useState(null)
  const[recievedMessage,setRecievedMessage]=useState(null)
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
//Sending Message to socket Server
  
  useEffect(()=>{
    socket.current=io(process.env.REACT_APP_BASE_URL)
    socket.current.emit("new-user-add",user.id)
    socket.current.on('get-users',(user)=>{
      setOnlineUsers(user)
     // console.log(onlineUsers,"nnnn")
    })
  },[user])
  useEffect(()=>{
    if(sendMessage!==null)
    {
      socket.current.emit('send-message',sendMessage)
    }
  },[sendMessage])

  //Recieve Message to socket Server
  useEffect(()=>{
    socket.current.on("recieve-message",(data)=>{
      setRecievedMessage(data)
    })
  },[])
  console.log(recievedMessage,"recieved message")


 const checkOnlinestatus=(chat)=>{
  const chatMembers=chat.members.find((member)=>member!== user.id)
  const online=onlineUsers.find((user)=>user.userId===chatMembers)
  return online?true:false
}

  return (
    <>
      {/* <div className="container"> */}
      <div className=" mt-4 flex h-screen">
          {/* leftside chat */}
        <div className="bg-white w-1/3">
          {/* search componnet here */}
          <div className="chat-container">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <div className="chatList">
         {chats.map((chat) => {
          return(

          
            <div onClick={()=>setCurrentChat(chat)}>
              < ChatConversations chatdata= {chat} currentuserId={user.id} online={checkOnlinestatus(chat)}/>
              </div>

          )
          })
          
        }
        </div>
        </div>
        </div>
        <div className=" flex flex-col  bg-blue-50 w-2/3 p-2">
         {/* right side chat component */}
         <ChatBox chat={currentChat} currentuserId={user.id} setSendMessage={setSendMessage} recievedMessage={recievedMessage}/>
       

        </div>
      </div>
      {/* </div> */}
    </>
  );
};
