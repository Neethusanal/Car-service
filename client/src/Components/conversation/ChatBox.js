import React, { useEffect, useState } from "react";
import { getmechanicData } from "../../Services/UserApi";

export const ChatBox = ({ chat, currentuserId }) => {
  const [userData, setUserData] = useState(null);
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
  console.log(userData, "hhhhhhhhhhhhhhhhhhhhhhhhhhh");
  return (
    <>
      <div classname="chatBoxcontainer"></div>
    </>
  );
};
