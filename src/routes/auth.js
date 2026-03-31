const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");

const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login",async(req,res)=>{
  try{
   const { password , emailID} = req.body;
   const user = await User.findOne({emailID : emailID});
  //  console.log(user);
  //  const users = await User.find();
  //  console.log(users);
   if(!user){
    throw new Error("Invalid Credentials");
   }
   const isPasswordValid  = await user.validatePassword(password);

   if(isPasswordValid){
    // create JWT token
    const token = await user.getJWT();
    console.log(token);
   //Add token to cookie and send the response back to the user
    res.cookie("token",token,{expires:new Date(Date.now()+7*3600000)});
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

module.exports = authRouter;