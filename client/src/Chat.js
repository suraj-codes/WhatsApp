import React, { useState } from "react";
import "./Chat.css"
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
const Chat = () => {
  const [status, setStatus] = useState(false);
  const handleroom = () => {
    setStatus(true);
  };
  return (
    <div className={`chat ${status && "showchat"}`} onClick={handleroom}>
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
};

export default Chat;
