import { Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";


import { io } from "socket.io-client";
import { MechChatConversations } from "../../Components/mechanicconversations/MechChatConversations";
import { MechChatBox } from "../../Components/mechanicconversations/MechChatBox";
import { mechanicChats } from "../../Services/MechanicApi";

export const MechanicChat = () => {
  const socket = useRef();
  const mechanic = useSelector((state) => state.mechanic);


  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recievedMessage, setRecievedMessage] = useState(null);
  //Sending Message to socket Server

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BASE_URL);
    socket.current.emit("new-user-add", mechanic.id);
    socket.current.on("get-users", (mechanic) => {
      setOnlineUsers(mechanic);
      //console.log(onlineUsers, "nnnn");
    });
  }, [mechanic]);
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //Recieve Message to socket Server
//   useEffect(() => {
//     socket.current.on("recieve-message", (data) => {
//       setRecievedMessage(data);
//     });
//   }, []);
  useEffect(() => {
    const getChats = async () => {
      try {
      
        const { data } = await mechanicChats(mechanic.id);
        console.log(data, "ddd");
        setChats(data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [mechanic]);

  const checkOnlinestatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== mechanic.id);
    const online = onlineUsers.find(
      (mechanic) => mechanic.mechanicId === chatMembers
    );
    return online ? true : false;
  };

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
                  return (
                    <div onClick={() => setCurrentChat(chat)}>
                      <MechChatConversations
                        chat={chat}
                        currentuserId={mechanic.id}
                        online={checkOnlinestatus(chat)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" flex flex-col  bg-blue-50 w-2/3 p-2">
            {/* right side chat component */}
            <MechChatBox
              chat={currentChat}
              currentuserId={mechanic.id}
              setSendMessage={setSendMessage}
              recievedMessage={recievedMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};
