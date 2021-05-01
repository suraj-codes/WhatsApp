import Avatara from "./Avatar.js";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, lastMSG }) => {
  
  return (
    <Link to={`/${id}`}>
      <div className="sidebarchat">
        <Avatara />
        <div className="sidebarchat__info">
          <h2>{name}</h2>
          <h1>{lastMSG}</h1>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
