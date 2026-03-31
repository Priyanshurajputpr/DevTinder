const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }

    // Validate token
    const decodedObj = jwt.verify(token, "dev@tinder");
    const { _id } = decodedObj;

    // Find user
    const user = await User.findById(_id); 

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();

  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};

module.exports = {
  authUser,
};

