const express = require("express");
require("dotenv").config()
const route = express.Router();
const User = require("../UserSchema");
const Room = require("../RoomSchema")
const cors = require("cors")
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: process.env.useTLS
});

const ChangeStream = Room.watch();
ChangeStream.on("change",(change)=>{

  if(change.operationType==='update'){
    const updatedMsg = change.updateDescription.updatedFields
    pusher.trigger("messages", "updated", {
      message: updatedMsg.messages[updatedMsg.messages.length-1].message
    })
  }else if(change.operationType==='insert'){
    pusher.trigger("rooms", "inserted", {
      room: change.fullDocument
    })
  }
  else{
    console.log("Pusher Error");
  }
})

route.get("/user", async(req, res) => {
  const email =  req.query.email;
  const finduser = await User.findOne({email})
  if(finduser){
    res.send(finduser);
  }else{
    res.send("Email not registered!!")
  }
});

route.post("/user", async (req, res) => {
  const name = req.body.name;
  const email =  req.body.email;
  const finduser = await User.findOne({email})
  if(finduser){
    res.send("User already exists!!");
  }else{
  try{
    let user = await new User({
      name,
      email,
      password:req.body.password,
      rooms:["6089431661f8f926f40a14e8"]
    });
      const data = await user.save();
    res.send(data);
  }catch(e){
    console.log(e);
    res.send("Something went wrong!");
  }
  }
});

route.get("/rooms",async(req,res)=>{
  const data = []
  const ids = req.query.ids;
      ids.map(async(e)=>{
        const rooms = await Room.findOne({"_id":e});
        
        if(!data.length){
            data[0] = rooms
        }else{
            data.push(rooms)
        }
      })
    
  const some = setInterval(()=> {  
    try{
      if(ids.length===data.length){
        res.send(data);
        clearInterval(some)
      }
     }catch(e){
      
    }
   }, 500);
    })

  
route.post("/rooms",async(req,res)=>{
  const rooms = new Room({
    name:req.body.name,
  })
  const roomId = await rooms.save()
 const user = await User.findOne({ email: req.body.email })
 user.rooms.push(String(roomId._id))
 const update = await User.updateOne({email:user.email}, { $set: {rooms:user.rooms}})
  res.send(user);
})

route.get("/room",cors(),async(req,res)=>{
  const _id = req.query.id
  const rooms = await Room.findOne({_id});
  res.send(rooms)
})

route.post("/message",cors(),async(req,res)=>{
  const current = new Date()
  const _id = req.body.roomId.roomId
    const newmsg = await Room.findOne({ _id})
 const data = {
   message:{
     name: req.body.name,
    email: req.body.email,
      content: req.body.input,
      time:current.toLocaleTimeString(),
      date:current.toLocaleDateString()
   }
 }
 if(newmsg.messages.length===0){
    newmsg.messages[0] = data
 }else{
 newmsg.messages.push(data)
 }
 const update = await Room.updateOne({_id}, { $set: {messages:newmsg.messages}})
 

})

route.post("/newmember",async(req,res)=>{
  try{
    const user = await User.findOne({ email: req.body.email })
    if(user){
      if(user.rooms.includes(roomId)){
        res.send("User already added to this room")
      }else{
      user.rooms.push(req.body.roomId)
      const update = await User.updateOne({email:user.email}, { $set: {rooms:user.rooms}})
      res.send("Member added to this room")
      }
    }else{
      res.send("This email Id is not registered!!")
    }
 
  }catch(e){
    res.send("Can't add member")
  }
})

module.exports = route;
