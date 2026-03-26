//This is the strarting file of your application .... this the main core js file where we will write nodeJs code

const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1");
   next();
    // res.send("Route Handler 1");
  },
  (req, res,next) => {
    console.log("Response 2");
    // res.send("Route Handler 2");
    next();
  },
    (req, res,next) => {
    console.log("Response 3");
    // res.send("Route Handler 3");
    next();
  },
    (req, res) => {
    console.log("Response 4");
    res.send("Route Handler 4");
  },
);

app.listen(3000, () => {
  console.log("Server is responding on port 3000 ....");
});
