//This is the strarting file of your application .... this the main core js file where we will write nodeJs code

const express = require("express");
const app = express();

const {authAdmin, authUser} = require("./middlewares/auth");

app.use("/admin",authAdmin);

app.use("/user/login",(req,res)=>{
  res.send("Logged in successfully!!");
})

app.use("/user/data",authUser,(req,res)=>{
  res.send("User data sent");
});

app.get("/admin/getAllData",(req,res)=>{
  res.send("Got All Data");
});
app.get("/admin/deleteUser",(req,res)=>{
  res.send("Deleted the user");
})

app.listen(3000, () => {
  console.log("Server is responding on port 3000 ....");
});
