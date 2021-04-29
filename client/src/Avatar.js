import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export const Avatara = () => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />;
};

export default Avatara;
