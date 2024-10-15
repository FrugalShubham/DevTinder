const express = require("express");
const { databaseConnection } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
