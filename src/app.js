//This is the strarting file of your application .... this the main core js file where we will write nodeJs code

const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const User = require('./model/user');
app.use(express.json());

//GET API ==> get user data by emailID
app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailID;
  try{
  const user = await User.find({emailID : userEmail});
  if(user.length === 0){
    res.status(401).send("User not found");
  }
    else{
      res.send(user);
    }
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
});


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

