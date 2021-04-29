import { Avatar, IconButton } from '@material-ui/core';
import { Email, MoreVert, SearchOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./ChatHeader.css"
const ChatHeader = () => {
  const [seed, setSeed] = useState("");
  const [roomname, setRoomname] = useState("");
  const { roomId } = useParams();
  useEffect(async() => {
      if (roomId) {
        const roomData = await axios.get("/room",{params:{id:roomId}})
        setRoomname(roomData.data.name)
       }
      setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const container = createRef();
  const [state, setState] = useState(false);
  const moreoptions = () => {
    setState(!state);
  };
  const addMember = async() => {
    const email = prompt("please enter New memeber email Address");
    if (email) {
      const res = await axios.post("/newmemeber",{roomId,email})
      alert(res.data)
    } else {
    }
  };
    return (
        <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerinfo">
          <h3>{roomname}</h3>
          <p>
            Last seen at {""}
          </p>
        </div>
        <div className="chat__headerright">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton onClick={moreoptions} ref={container}>
            <MoreVert />
            {state && (
              <div className="dropdown">
                <ul>
                  <li onClick={addMember}>
                    Add Member
                  </li>
                </ul>
              </div>
            )}
          </IconButton>
        </div>
      </div>
    )
}

export default ChatHeader
