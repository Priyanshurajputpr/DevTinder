//This is the strarting file of your application .... this the main core js file where we will write nodeJs code

const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const User = require('./model/user');
app.use(express.json());
app.post("/signup", async (req,res)=>{
  //Creating a new instance of user model
const user = new User(req.body); 
  try{
  await user.save();
  res.send("User added successfully!!");
  }
  catch(err){
    res.status(400).send("Error saving the user :"+err.message);
  }
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

