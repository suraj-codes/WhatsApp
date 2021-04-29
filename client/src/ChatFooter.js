import { IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react'
import "./ChatFooter.css"
import { useStateValue } from './StateProvider';

import { useParams } from "react-router-dom";
const ChatFooter = () => {
    const roomId = useParams()
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        setInput("");
        e.preventDefault();
        await axios.post("/message",{email:user.email,input,roomId,name:user.name})
      };
    return (
        <div className="chat__footer">
      <IconButton>
          <InsertEmoticon />
          
          </IconButton>
        
        <IconButton>
            <AttachFile />
          </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
        <Mic />
        </IconButton>
      </div>
    )
}

export default ChatFooter
