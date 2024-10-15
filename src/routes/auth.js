const express = require('express')
const bcrypt = require("bcrypt");
const User = require("../models/users");
const { validateSingUp } = require("../utils/validate");
const validator = require("validator");


const authRouter = express.Router()



authRouter.post("/singUp", async (req, res) => {
    try {
      validateSingUp(req);
      const {
        firstName,
        lastName,
        emailId,
        password,
        age,
        gender,
        about,
        photoUrl,
        skill,
      } = req.body;
      const passwordHashBcrypt = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHashBcrypt,
        age,
        gender,
        about,
        photoUrl,
        skill,
      });
      await user.save();
      res.send("successFull  save");
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  });
  
authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      if (!validator.isEmail(emailId)) {
        throw new Error("Place enter valid EmailID");
      }
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("invalid credentials");
      }
      const isLogin = await user.validatePassword(password);
      if (isLogin) {
        const token = await user.getJWT();
        res.cookie("token", token ,{expires: new Date(Date.now() + 9*900000)});
        res.send("Login is SuccessFull");
      } else {
        throw new Error("invalid credentials");
      }
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  });

authRouter.post("/logout", async (req,res)=>{
  try{
    res.cookie('token' , null , { expires: new Date(Date.now()),})
    res.send("logout SuccessFull")
  }
  catch(err){
    res.status(400).send("ERROR : " + err.message)
  }
  });

module.exports = authRouter