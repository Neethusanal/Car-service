import React, { useEffect, useRef, useState } from "react";
import {
  addMessage,
  getMessages,
  getmechanicData,
} from "../../Services/UserApi";

import profile from "../../Images/profile.jpg";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { FiSend } from "react-icons/fi";
import { Button } from "@material-tailwind/react";

export const ChatBox = ({
  chat,
  currentuserId,
  setSendMessage,
  recievedMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  console.log(recievedMessage);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
//Fetching data for Header
  useEffect(() => {
    const mechanicId = chat?.members?.find((id) => id !== currentuserId);

    const getUserData = async () => {
      try {
        const { data } = await getmechanicData(mechanicId);

        setUserData(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentuserId]);
  // Fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
//scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  
 
  const handleSend = async (e) => {
    e.preventDefault();
    const inputmessage = {
      senderId: currentuserId,
      text: newMessage,
      chatId: chat._id,
    };
     //send Message to socket server
     const recieverId = chat?.members?.find((id) => id !== currentuserId);
     console.log(recieverId)
     setSendMessage({...messages,recieverId})

    //send Message to database
    try {
      const { data } = await addMessage(inputmessage);
      console.log(data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

  };//Recieve message from parent component
  useEffect(() => {
    if (recievedMessage !== null && recievedMessage.chatId === chat._id) {
      setMessages([...messages, recievedMessage]);
    }
  }, [recievedMessage]);

  return (
    <>
      <div classname="chatBoxcontainer ">
        {chat ? (
          <>
            <div className="chatheader">
              <div className="follower">
                {userData?.map((mechdata, index) => {
                  return (
                    <div
                      className="follower conversation flex items-center"
                      key={index}
                    >
                      <div className="mr-4">
                      
                        <img
                          src={mechdata?.image || profile}
                          alt=""
                          className={`w-14 h-12 rounded-full object-cover ${
                            !mechdata?.image && "bg-gray-300"
                          }`}
                        />
                      </div>
                      <div className="text-lg w-full">
                        <span>{mechdata?.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr className="my-4 border-gray-300" />
            </div>
            {/* chatBox Messages */}
            <div className="chatbody ">
              {messages?.map((msg, index) => {
                return (
                  <>
                  {msg.senderId === currentuserId ? (
  <div
    ref={scroll}
     key={index}
    className= " msg justify-end flex mb-2"
  >
    <div className=" text-white p-3 rounded-lg">
      <span className="text-lg font-semibold">{msg.text}</span>
      <span className="text-sm">{format(msg.createdAt)}</span>
    </div>
  </div>
) : (
  <div
    ref={scroll}
     key={index}
    className="msg justify-start flex mb-2"
  >
    <div className="msg-content bg-gray-200 p-3 rounded-lg">
      <span className="text-lg font-semibold">{msg.text}</span>
      <span className="text-sm">{format(msg.createdAt)}</span>
    </div>
  </div>
)}
</>
                );
              })}
            </div>
            {/* chat sender */}
              <div>
            <div className="chat-sender flex items-center">
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                className="mr-2"
              />

              <Button onClick={(e) => handleSend(e)}>
                <FiSend />
              </Button>
            </div>
            </div>
          </>
        ) : (
          <div class="flex justify-center items-center h-screen">
            <span class="text-center">Tap on a chat to start conversation</span>
          </div>
        )}
      </div>
    </>
  );
};
