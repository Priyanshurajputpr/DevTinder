//This is the strarting file of your application .... this the main core js file where we will write nodeJs code

const express  = require("express");
const app = express();

app.get("/user/:userID/:name/:password",(req,res)=>{
  console.log(req.params);
  res.send("Getting the respone");
});
 

app.listen(3000 , ()=>{
  console.log("Server is responding on port 3000 ....");
}); 