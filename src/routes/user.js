const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const ConnectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender about skills"
    );
    res.json({
      message: "Data fetched successfully",
      data: ConnectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR  : " + err.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", "firstName lastName age skills about gender");
    res.json({
      message: "connected users received successfully",
      connections,
    });
  } catch (err) {
    res.status(400).send({ message: "ERROR : " + err.message });
  }
});
module.exports = userRouter;
