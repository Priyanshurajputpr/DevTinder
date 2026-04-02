const express = require("express");
const {authUser} = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view",authUser,async(req,res)=>{
  try{
  const user  = req.user;
  if(!user){
    throw new Error("User is not present");
  }
  res.send(user);
  }
   catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
});

profileRouter.patch("/profile/edit",authUser,async(req,res)=>{
  try{
  if(!validateEditProfileData(req)){
    throw new Error("Invalid Edit Request");
  }
  const loggedInUser = req.user;
  Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
  await loggedInUser.save();
  console.log(loggedInUser);
  res.send("Profile Updated Successfully!!");
  }
  catch(err){
    res.status(400).send("ERROR : "+err.message);
  }
});

module.exports = profileRouter;