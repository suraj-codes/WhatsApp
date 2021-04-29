import Avatara from "./Avatar.js";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SidebarChat = ({ id, name }) => {
  
  return (
    <Link to={`/${id}`}>
      <div className="sidebarchat">
        <Avatara />
        <div className="sidebarchat__info">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
