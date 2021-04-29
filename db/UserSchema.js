const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name:String,
    email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  rooms:Array
  
});
module.exports = User = new mongoose.model("user", userSchema);
