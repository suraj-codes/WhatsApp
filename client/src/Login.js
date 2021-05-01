import React, { useState } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import axios from "axios";
const Login = () => {
  const [{user},dispatch] = useStateValue();
  const [signup,setSignup] = useState(false);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const login = async() => {
    if(email===""||password===""){
      alert("Please Fill all fields");
    }else{
      const res = await axios.get("/user",{params:{email}})
    if(typeof(res.data)=="string"){
      alert(res.data)
    }else{
      dispatch({
              type: actionTypes.SET_USER,
              user: res.data,
            });
    }
    }
  };
  const register = async()=>{
    if(email===""||password===""||name===""){
      alert("Please fill all fields")
    }else{
      const res = await axios.post("/user",{email,password,name})
    if(typeof(res.data)=="string"){
        alert(res.data)
      }else{
        alert("Registered Successfully!!",user.name)
        dispatch({
                type: actionTypes.SET_USER,
                user: res.data,
              });
      }
    }
  }
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png"
          alt=""
        />
        <div className="login__text">
          {signup?<h1>Create New Account</h1>:<h1>Sign in to Whatsapp</h1>}
        </div>
        {signup?
        
        <div className="login__form">
          <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        <Button onClick={register}>Register</Button>
        </div>
        :
        <div className="login__form">
          <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
          <Button onClick={login}>Sign In</Button>
          </div>
        }
        {signup?<Button onClick={()=>{setSignup(false);setEmail("");setPassword("")}}>Already have an account.</Button>:
        <Button onClick={()=>{setSignup(true);setEmail("");setPassword("")}}>Create New Account</Button>}
      </div>
      
      </div>
  );
};

export default Login;
