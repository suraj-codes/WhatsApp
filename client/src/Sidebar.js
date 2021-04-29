import React, { createRef, useEffect, useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Add, SearchOutlined, SettingsVoiceRounded } from "@material-ui/icons";

import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import Pusher from "pusher-js";
const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(async() => {
    const roomData = await axios.get("/rooms",{params:{ids:user.rooms}})
      setRooms(
        roomData.data.map((doc) => ({
          name: doc.name,
          _id: doc._id,
        }))
      )
  }, []);
  useEffect(()=>{
    const pusher = new Pusher('f8bd1140c065095666d8', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('rooms');
    channel.bind('inserted', function(data) {
        setRooms((prevState)=>(
          [...prevState,{
           name: data.room.name,
           _id: data.room._id,
         }]
        ))
     
  })
  },[])
  const container = createRef();
  const [state, setState] = useState(false);
  const moreoptions = () => {
    setState(!state);
  };
  const createChat = async() => {
    const name = prompt("please enter room name");
    if (name) {
      const created = await axios.post("/rooms",{name,email:user.email})

    } 
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerright">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={moreoptions} ref={container}>
            <MoreVertIcon />
            {state && (
              <div className="dropdown">
                <ul>
                  <li onClick={createChat}>
                    New Room
                  </li>
                </ul>
              </div>
            )}
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchcontainer">
          <SearchOutlined />

          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat key={room._id} id={room._id} name={room.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
