const mongoose = require("mongoose")
const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://sanjai:sanjai2005@devtinder.dmainha.mongodb.net/devtinderDB")

}
module.exports =connectDB;
