import React, { useEffect, useState } from "react";

import profile from "../../Images/profile.jpg";
import { getUser } from "../../Services/MechanicApi";

export const MechChatConversations = ({ chat, currentuserId ,online}) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = chat.members.find((id) => id !== currentuserId);
    console.log(userId, "ussssssssssss");

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data.result);
        console.log(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  console.log(userData, "bbbbbbbbbb");
  return (
    <>
    
      <div className="follower conversation">
        <div>
         

          {userData?.map((details, index) => {
            return (
              <div
                className="follower conversation flex items-center"
                key={index}
              >
                <div className="mr-4">
                  <div className="online-dot"></div>
                  <img
                    src={details?.image || profile}
                    alt=""
                    className={`w-14 h-12 rounded-full object-cover ${
                      !details?.image && "bg-gray-300"
                    }`}
                  />
                </div>
                <div className="text-lg w-full">
                  <span>{details?.name}</span>
                  <span className="float-right mr-2">{online?"online":"offline"}</span>
                </div>
              </div>
            );
          })}
        
        </div>
      </div>
     
      <hr className="my-4 border-gray-300" />
    </>
  );
};
