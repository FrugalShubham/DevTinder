const express = require("express");
const { authUser } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", authUser, async (req, res) => {
  try {
    const { firstName } = req.user;
    res.send(firstName + "  is send connection request");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = requestRouter;
