//This is the strarting file of your application .... this the main core js file where we will write nodeJs code
const bcrypt = require("bcrypt");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./model/user");
const user = require("./model/user");
const { validateSignUpData } = require("./utils/validation");

app.use(express.json());
app.use(cookieParser());

//GET API ==> get user data by emailID
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailID;
  try {
    const user = await User.find({ emailID: userEmail });
    if (user.length === 0) {
      res.status(401).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//GET all users

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// usecase of findOne();
app.get("/userOne", async (req, res) => {
  const userEmail = req.body.emailID;
  try {
    const user = await User.findOne({ emailID: userEmail });
    if (user.length === 0) {
      res.status(401).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//DELETE API
app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//UPDATE API
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const AllowedUpdates = ["photoURL", "age", "gender", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      AllowedUpdates.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 5) {
      throw new Error("Skills can not be more than 5");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update failed " + err.message);
  }
});

app.post("/signup", async (req, res) => {
     
  try {
    //Validation
    validateSignUpData(req);
    //Encryption

    const { password, firstName, lastName, emailID } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //Creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

app.post("/login",async(req,res)=>{
  try{
   const { password , emailID} = req.body;
   const user = await User.findOne({emailID : emailID});
  //  console.log(user);
  //  const users = await User.find();
  //  console.log(users);
   if(!user){
    throw new Error("Invalid Credentials");
   }
   const isPasswordValid  = await bcrypt.compare(password,user.password);

   if(isPasswordValid){
    // create JWT token
    const token = await jwt.sign({_id:user._id},"dev@tinder");
    console.log(token);
   //Add token to cookie and send the response back to the user
    res.cookie("token",token);
    res.send("Login Successfull!!");
   }
   else{
    throw new Error("Invalid Credentials");
   }
  }
  catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
});

app.get("/profile",async(req,res)=>{
  try{
  const cookies = req.cookies;
  const {token} = cookies;
  if(!token){
    throw new Error("Invalid token");
  }
  const decodedMessage = await jwt.verify(token,"dev@tinder");
  const {_id} = decodedMessage;
  console.log("Logged in user is "+_id);
  const user  = await User.findByIdAndDelete(_id);
  if(!user){
    throw new Error("User is not present");
  }
  res.send(user);
  }
   catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is responding on port 3000 ....");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected");
  });
