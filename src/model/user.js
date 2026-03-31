const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName:{
    type :String,
    required:true,
    maxLength:20,
    minLength:5,
  },
  lastName:{
    type:String,
    maxLength:20,
    minLength:5,
  },
  emailID:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Inavalid email addresss")
      }
    }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    validate(value){
    if(!validator.isStrongPassword(value)){
      throw new Error("Not a strong password")
    }
    },
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
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Not valid URL")
      }
    }
  },
},
{timestamps:true},);

userSchema.methods.getJWT = async function(){
const user = this;
const token = await jwt.sign({_id:user._id},"dev@tinder",{expiresIn:"7d"});
return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
  return isPasswordValid;
};

// const User = mongoose.model("User",userSchema);
// module.exports={User};

module.exports = mongoose.model("User",userSchema);
