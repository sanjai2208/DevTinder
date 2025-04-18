const express = require("express");
const app = express();

app.get("/user",(req, res)=>{
  res.send({firstName : "sanjai", city : "TKm"})
});
app.post("/user", (req, res)=>{
  //saving data to database
  res.send({firstName :"sanjai",
    city : "tkm"
  })
  
})
app.delete("/user", (req, res)=>{
  res.send("data deleted successfully ")
  
})


app.listen(2810, ()=>console.log("server is successfully running"))

