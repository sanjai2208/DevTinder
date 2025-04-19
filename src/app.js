const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")

app.post("/signup",async (req, res) => {
    
   const user = new User({
    firstName : "akshay",
    lastName : "saini", 
    emailId : "akshay@hero.com",
    password : "akshay@2005"
   })
   try{
    await user.save();
    res.send("Data stored successfully")
  }
   catch(err){
    res.status(400).send("Error saving the user :" + err.message)
  }
})



connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(2810, () => {
      console.log("server is running ");
    });
  })
  .catch((err) => console.log("Database can not connected"));


