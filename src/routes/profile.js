const express = require("express");

const profileRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validate");

const bcrypt = require('bcrypt')


profileRouter.get("/profile/view", authUser, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", authUser , async(req,res)=>{
  try{
    const isValidEdit = validateEditProfile(req)
    if(!isValidEdit){
      throw new Error("Invalid edit request")
    }

    const loginUser = req.user
   
    Object.keys(req.body).every((key)=> loginUser[key] = req.body[key] )
 
    await loginUser.save()
    

    res.json({message:`${loginUser.firstName} is successful update `, data:loginUser})

  }catch(err){
    res.status(400).send("ERROR : " + err.message)
  }
})

profileRouter.patch("/profile/password", authUser , async(req,res)=>{
  try{
  const user=req.user
  const isAllow =["password"]

  const isValidateRequest = Object.keys(req.body).every((key)=>isAllow.includes(key))


  if(!isValidateRequest){
    throw new Error("Invalid request")
  }
  const passwordHash = await bcrypt.hash(req.body.password, 10)

  user.password = passwordHash

  await user.save()
  res.send("successfully change the password")




}catch(err){
  res.status(400).send("ERROR : " + err.message)
}
  

})

module.exports = profileRouter;
