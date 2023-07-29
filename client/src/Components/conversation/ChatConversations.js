import React, { useEffect, useState } from "react";
import { getmechanicData } from "../../Services/UserApi";
import profile from "../../Images/profile.jpg";

export const ChatConversations = ({ chatdata, currentuserId ,online}) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const mechanicId = chatdata.members.find((id) => id !== currentuserId);
    console.log(mechanicId, "ussssssssssss");
    console.log(online,"mmmmmmmmmm")
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

  return (
    <>
    
      <div className="follower conversation">
        <div>
         

          {userData?.map((mechdata, index) => {
            console.log(online,"online")
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
                  <span className="float-right mr-2"style={{color: online?"#51e200":""}}>{online ? "online":"offline"}</span>
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
