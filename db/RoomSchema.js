const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  messages:[
    {message:{
      name:String,
      email:String,
      content:String,
      time:String,
      date:String
    }}
  ]
});
module.exports = Room = new mongoose.model("room", roomSchema);
