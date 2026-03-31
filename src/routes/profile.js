const express = require("express");
const {authUser} = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/profile",authUser,async(req,res)=>{
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

module.exports = profileRouter;