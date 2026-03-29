const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName:{
    type :String,
    required:true,
    maxLength:20,
    minLength:10,
  },
  lastName:{
    type:String,
    maxLength:20,
    minLength:10,
  },
  emailID:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    trim:true,
  },
  age:{
    type:Number,
    min:18,
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    },
  },
  about:{
    type:String,
    default:"This is default",
  },
  skills:{
    type:[String],
  },
   photoURL:{
    type:String,
    default:"https://pngtree.com/freepng/user-avatar-boy_4693645.html",
   
  },
},
{timestamps:true},);

// const User = mongoose.model("User",userSchema);
// module.exports={User};

module.exports = mongoose.model("User",userSchema);
