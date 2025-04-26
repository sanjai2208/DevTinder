const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData, validateLogin } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth}= require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("Data stored successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
app.post("/login" ,async (req, res) =>{

  try{
    validateLogin(req)
    const {emailId, password} = req.body;
    
    const user =await User.findOne({emailId:emailId})
    if(!user){
      throw new Error ("Invalid Credential")
    }
    const isPasswordValid =await user.validatePassword(password)

    if(isPasswordValid){

      const token = await user.getJWT();
      
      res.cookie("Token", token,{expires:new Date(Date.now()+ 8 * 3600000)})
      res.send("Login successfully")
    }
    else{
      throw new Error  ("Invalid Credential")
    }
  }catch (err) {
    res.status(400).send("Error : " + err.message);
  }
})
app.get("/profile", userAuth,async (req, res) => {
 try { 
  const user = req.user
  res.send(user)}
  catch (err) {
    res.status(400).send("Error : " + err.message);
  }
})  
app.post("/sendConnectionRequest",userAuth, (req, res)=>{
  const {firstName} = req.user
 console.log(firstName+" Sending a request connection");
 res.send("Connection Request Sent!")
})


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(2810, () => {
      console.log("server is running ");
    });
  })
  .catch((err) => console.log("Database can not connected"));
 