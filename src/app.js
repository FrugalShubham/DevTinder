const express = require("express");
const { authUser } = require("./middlewares/auth");

const { databaseConnection } = require("./config/database");
const User = require("./models/users");

const { validateSingUp } = require("./utils/validate");

const bcrypt = require("bcrypt");

const app = express();

const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/singUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Place enter valid EmailID");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const isLogin = await bcrypt.compare(password, user.password);
    if (isLogin) {
      const token = await jwt.sign({ _id: user._id }, "devTinder@123",{expiresIn:'7d'});
      res.cookie("token", token ,{expires: new Date(Date.now() + 9*900000)});
      res.send("Login is SuccessFull");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/profile", authUser, async (req, res) => {
  try {
    
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/sendConnectionRequest",authUser,async(req,res)=>{
    try{
        const {firstName}=req.user
        res.send(firstName + "  is send connection request")

    }catch(err){
        res.status(400).send("Error : "+ err.message)
    }
})

//get user by emailID
// app.get("/user", async (req, res) => {
//   const useEmailId = req.body.emailId;
//   try {
//     const user = await User.find({ emailId: useEmailId });
//     if (user.length === 0) {
//       res.send("data is not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("something is wrong" + err.message);
//   }
// });

// // get all users
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("something is wrong" + err.message);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User Id is successFull delete");
//   } catch (err) {
//     res.status(400).send("something is wrong" + err.message);
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOW_TO_UPDATE = ["gender", "about", "skill", "age", "photoUrl"];
//     const isAllowUpdate = Object.keys(data).every((k) =>
//       ALLOW_TO_UPDATE.includes(k)
//     );
//     if (!isAllowUpdate) {
//       throw new Error("this filed is not allow");
//     }
//     await User.findByIdAndUpdate(userId, data, { runValidators: true });
//     res.send("successFull update");
//   } catch (err) {
//     res.status(400).send("something is wrong" + err.message);
//   }
// });

databaseConnection()
  .then(() => {
    console.log("database successFull connect");
    app.listen(3000, () => {
      console.log("server is started port is 3000");
    });
  })
  .catch((err) => {
    console.error("database not connect");
  });
