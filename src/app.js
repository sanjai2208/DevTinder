const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser")



app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request") 
const userRouter = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)
  



connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(2810, () => {
      console.log("server is running ");
    });
  })
  .catch((err) => console.log("Database can not connected"));
 