const express = require("express");
const cors = require("cors")
const app = express();
require("./db/conn.js");
const port = process.env.PORT || 8000;
app.use(express.json())
app.use(cors())
app.use("/", require("./db/api/Api"));

if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
}

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
