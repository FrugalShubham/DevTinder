const jwt = require("jsonwebtoken");
const express = require("express");
const Users = require("../models/users");
const cookieParser = require("cookie-parser");

const app = express()

app.use(cookieParser());


const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedObj = await jwt.verify(token, "devTinder@123");
    console.log(decodedObj)
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
