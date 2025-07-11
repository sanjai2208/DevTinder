const express = require("express");
const authRouter = express.Router();
const { validateSignUpData, validateLogin } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
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
    res.json({message : "Data stored successfully"});
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    validateLogin(req);
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("Token", token, {
        expires: new Date(Date.now() + 24 * 3600000),
      });
      res.json(user);
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).json({message : err.message});
    
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("Token", null, { expires: new Date(Date.now()) }).json({message : "User Logged Out"});
});

module.exports = authRouter;
