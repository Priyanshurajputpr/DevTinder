const express = require("express");
const requestRouter = express.Router();
const {authUser} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",authUser,async(req,res)=>{
try{
  const user  = req.user;
console.log("Sending connection request");
res.send(user.firstName+" send connection request..");
}
catch(err){
    res.status(400).send("ERROR : "+ err.message);
  }
});

module.exports = requestRouter;