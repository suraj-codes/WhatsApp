const mongoose = require("mongoose");
require("dotenv").config()
const db =process.env.MONGODB_URI||process.env.DB;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
