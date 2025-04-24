const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData, validateLogin } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

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
    const isPasswordValid =await bcrypt.compare(password, user.password)

    if(isPasswordValid){

      const token = jwt.sign({_id:user._id},"Dev@Tinder$2810")
      
      res.cookie("Token", token)
      res.send("Login successfully")
    }
    else{
      throw new Error  ("Invalid Credential")
    }
  }catch (err) {
    res.status(400).send("Error : " + err.message);
  }
})
app.get("/profile", async (req, res) => {
 try { const {Token} = req.cookies
 if(!Token){
  throw new Error("Invalid Token")
 }
  const decodedMsg = await jwt.verify(Token, "Dev@Tinder$2810")

  const {_id} = decodedMsg
  const user = await User.findOne({_id:_id})
  if(!user){
    throw new Error("User is not present")
  }
  res.send(user)}
  catch (err) {
    res.status(400).send("Error : " + err.message);
  }
})
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("user not found");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("users not found");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  {
    try {
      const user = await User.findByIdAndDelete(userId);
      res.send("User deleted successfully");
    } catch (err) {
      res.status(404).send("users not found");
    }
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skill can not be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(2810, () => {
      console.log("server is running ");
    });
  })
  .catch((err) => console.log("Database can not connected"));
