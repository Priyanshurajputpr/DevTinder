const express = require("express");
const { authUser } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../model/connectionRequest");

const USER_SAFE_LIST = ["firstName" , "lastName" , "age" , "about" , "photoURL"];

userRouter.get("/user/requests/received",authUser,async(req,res)=>{
  try{
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId:loggedInUser._id,
      status:"interested"
    }).populate("fromUserId",USER_SAFE_LIST);

    res.json({message:"Data fetched successfully",
      data:connectionRequest
    });
  }
  catch(err){
    res.status(400).send("ERROR : "+err.message);
  }
});

userRouter.get("/user/connections",authUser , async(req,res)=>{
  try{
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or:[
      { status:"accepted" , toUserId : loggedInUser._id},
      {fromUserId : loggedInUser._id , status:"accepted"},  
    ],
    }).populate("fromUserId",USER_SAFE_LIST).populate("toUserId",USER_SAFE_LIST);
    const data  = connectionRequests.map((row)=>{
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({message:"Connection fetched successfully",
      data
    });
  }
 catch(err){
    res.status(400).send("ERROR : "+err.message);
  }
});

userRouter.get("/feed", authUser , async (req,res)=>{
try{
const loggedInUser = req.user;
let page = parseInt(req.query.page);
let limit = parseInt(req.query.limit);
let skip = (page-1)*limit;

const connectionRequests = await ConnectionRequest.find({
  $or:[
    {fromUserId:loggedInUser._id},
    {toUserId:loggedInUser._id}
  ],
}).select("fromUserId toUserId");

const hideUsersFromFeed = new Set();
connectionRequests.forEach((req)=>{
  hideUsersFromFeed.add(req.fromUserId.toString());
  hideUsersFromFeed.add(req.toUserId.toString());
});

const users = await User.find({
  $and:[
    {_id:{$nin:Array.from(hideUsersFromFeed)}},
    {_id:{$ne:loggedInUser._id}},
  ],
}).select(USER_SAFE_LIST).skip(skip).limit(limit);
res.json({users});
}  
catch(err){
    res.status(400).send("ERROR : "+err.message);
  }
});

module.exports = userRouter;