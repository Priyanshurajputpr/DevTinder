//This is the strarting file of your application .... this the main core js file where we will write nodeJs code

const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const User = require('./model/user');

app.post("/signup", async (req,res)=>{
  //Creating a new instance of user model
const user = new User({
    firstName : "Shiv",
    lastName : "Tiwari",
    emailID  : "Shiv@gmail.com",
    password : "shIv@123"
  }); 
  await user.save();
  res.send("User added successfully!!");
});

connectDB()
.then(()=>{
  console.log("Database connection established");
  app.listen(3000, () => {
  console.log("Server is responding on port 3000 ....");
}); 
})
.catch((err)=>{
  console.error("Database can not be connected");
});

