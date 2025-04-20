const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Data stored successfully");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data);
    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("users not found");
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
