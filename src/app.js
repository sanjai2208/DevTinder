const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Namste dashboard");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello");
});

app.use("/test", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, () => {
  console.log("server is listening successfully on port 3000");
});
