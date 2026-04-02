const validator = require("validator");
const validateSignUpData = (req)=>{
  const{firstName , lastName , emailID , password} = req.body;
  if(!firstName || !lastName){
    throw new Error("Nmae is not valid");
  }
  else if(!validator.isEmail(emailID)){
    throw new Error("Email is not valid");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not strong");
  }
};

const validateEditProfileData = (req)=>{
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "gender",
    "photoURL",
    "skills",
    "age"
  ];
  const isEditAllowed = Object.keys(req.body).every((field)=>
  allowedEditFields.includes(field));

  return isEditAllowed;
}
module.exports = {validateSignUpData,validateEditProfileData};