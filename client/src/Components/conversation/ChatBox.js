import React, { useEffect, useState } from "react";
import { getMessages, getmechanicData } from "../../Services/UserApi";
import profile from "../../Images/profile.jpg";
import { format } from "timeago.js";
export const ChatBox = ({ chat, currentuserId }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const mechanicId = chat?.members?.find((id) => id !== currentuserId);
    console.log(mechanicId);
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
        console.log(chat._id, "nnnnnnnnnnnn");
        const { data } = await getMessages(chat._id);
        console.log(data, "messagedata");
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  return (
    <>
      <div classname="chatBoxcontainer">
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
                      <div className="online-dot"></div>
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
          <div className="chatbody">
            {messages.map((msg) => {
              return (
                <>
                  <div
                    className={`msg ${
                      msg.senderId === currentuserId ? "own" : ""
                    } bg-blue-500 text-white p-3 rounded-lg mb-2`}
                  >
                    <span className="flex flex-col items-end">
                      <span className="text-lg font-semibold">{msg.text}</span>
                      <span className="text-sm">{format(msg.createdAt)}</span>
                    </span>
                  </div>
                </>
              );
            })}
          </div>
          {/* chat sender */}
          <div className="chat-sender">
                      <div>+</div>
          </div>
        </>
      </div>
    </>
  );
};
