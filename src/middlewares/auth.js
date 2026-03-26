const authAdmin = (req,res,next)=>{
  console.log("Authentication is done");
  const token = "xyz";
  const isAdminAuthorized = token ==="xyz";
  if(!isAdminAuthorized){
    res.status(401).send("Unauthorized Request");
  }
  else{
    next();
  }
}

const authUser = (req,res,next)=>{
  console.log("Authentication is done");
  const token = "xyz";
  const isAdminAuthorized = token ==="xyz";
  if(!isAdminAuthorized){
    res.status(401).send("Unauthorized Request");
  }
  else{
    next();
  }
}

module.exports = {
  authAdmin,authUser
};