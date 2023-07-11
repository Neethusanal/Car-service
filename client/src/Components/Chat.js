import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FiSend } from 'react-icons/fi';


export const Chat = () => {
    const[ws,setWs]=useState(null)
    useEffect(()=>{
     const ws=   new WebSocket('ws://localhost:4000')
        setWs(ws);
        ws.addEventListener('message',handleMessage)
    },[])
    function handleMessage(e){
        console.log("new message",e)
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
            <Button>
            <FiSend />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
