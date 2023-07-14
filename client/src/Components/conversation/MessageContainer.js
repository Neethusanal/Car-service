import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";

export const MessageContainer = () => {
  const user = useSelector((state) => state.user);
  const [currentChat, setCurrentChat] = useState(null);
  return (
    <>
      <div className="flex-grow "> messages with the selected person</div>
      {/* <div className="flex gap-2 mx-2">
      <input
        type="text"
        placeholder="Type your message here"
        className="bg-white flex-grow border rounderd-sm p-2"
      />
       <Button> 
        <FiSend /> 
       </Button> 
    </div> */}
    </>
  );
};
