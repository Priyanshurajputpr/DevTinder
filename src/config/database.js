const mongoose = require("mongoose");

const connectDB = async()=>{
  await mongoose.connect("mongodb+srv://PriyanshuRajput:MfEsynRYYRBVUaMG@namastenode.yxegh84.mongodb.net/devTinder");
};


module.exports = {connectDB};