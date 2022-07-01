const mongoose = require("mongoose");
const app = require("./app.js");
const config = require("./config/config.js");

mongoose.connect(config.mongoose.url,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to DB at", config.mongoose.url)
}).catch((err) => {
  console.log("Error", err)
})


app.listen(config.port, () =>{
  console.log("Server listening", config.port);
})