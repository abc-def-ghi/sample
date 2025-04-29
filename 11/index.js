const exp = require("express"); 
const app = exp(); 
const userApp = require("./userApi"); 
const mongoose = require("mongoose"); 
app.listen(3000, () => console.log("http server on port 3000")); 
app.use("/user-api", userApp); 
mongoose 
  .connect(MONGODB_URL) 
  .then(() => console.log("successful")) 
  .catch((err) => console.log("err")); 