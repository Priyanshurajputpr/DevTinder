//This is the strarting file of your application .... this the main core js file where we will write nodeJs code

const express  = require("express");
const app = express();

app.get("/user",(req , res)=>{
  res.send({
    "firstname":"Priyanshu",
    "lastname":"Rajput"
  })
});
app.post("/user",(req,res)=>{
  res.send("Data saved successfully");
});
app.patch("/user",(req,res)=>{
  res.send("Data saved successfully");
});
app.delete("/user",(req,res)=>{
  res.send("Data deleted successfully");
});
app.use("/test", (req, res) => {
  res.send("Testing for routers");
});

app.use("/hello" , (req , res)=>{
  res.send("Hello from the server");
});

app.use("/", (req , res)=>{  // always put this file at the last because it matches (/) the middleware and do not let reaches to the other routers...... so hello and test will not show output...
  res.send("Hello this is dashboard! ");
});

app.listen(3000 , ()=>{
  console.log("Server is responding on port 3000 ....");
}); 