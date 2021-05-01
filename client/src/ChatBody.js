import React, { useEffect, useState } from 'react'
import "./ChatBody.css"
import { useParams } from "react-router-dom";
import axios from "./axios";
import Pusher from "pusher-js";
import { useStateValue } from './StateProvider';
const ChatBody = () => {
    const [{ user }] = useStateValue();
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    useEffect(() => {
      const renderRoom=async()=>{
        if(roomId){
          const roomData = await axios.get("https://surajcodeswhatsapp.herokuapp.com/room",{params:{id:roomId}})
          setMessages(roomData.data.messages)     
         }
      }
      renderRoom();
    }, [roomId]);
    
    useEffect(()=>{
    const pusher = new Pusher('f8bd1140c065095666d8', {
        cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('updated', function(newMsg) {
        setMessages((prevState)=>(
          [...prevState,newMsg]
        ))
    });
    return ()=>{
      channel.unbind()
      channel.unsubscribe()
    }

    },[]);
    return (
        <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.message.email === user.email && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.message.name}</span>
            {message.message.content}
            <span className="chat__timestamp">
              {message.message.time}
            </span>
          </p>
        ))}
      </div>
    )
}

export default ChatBody
