const jwt = require("jsonwebtoken");
const Users = require("../models/users");



const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedObj = await jwt.verify(token, "devTinder@123");

    const { _id } = decodedObj;

    const user = await Users.findById(_id);

    if (!user) {
      throw new Error("User is not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};
module.exports = {
  authUser,
};
