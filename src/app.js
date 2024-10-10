const express = require('express')

const app = express();

// app.use("/", (req,res)=>{
//  res.send("server ")
// })

app.use("/hello", (req,res)=>{
    res.send("server is dashboard")
})

app.listen(3000,()=>{
    console.log("server is started")
})