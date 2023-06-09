import React, { useEffect, useState } from "react";
import { getmechanicData } from "../../Services/UserApi";
import profile from "../../Images/profile.jpg";

export const ChatConversations = ({ data, currentuserId }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const mechanicId = data.members.find((id) => id !== currentuserId);
    console.log(mechanicId, "ussssssssssss");

    const getUserData = async () => {
      try {
        const { data } = await getmechanicData(mechanicId);
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
                  <span className="float-right mr-2">online</span>
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
