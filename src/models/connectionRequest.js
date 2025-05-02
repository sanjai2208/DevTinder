const mongoose = require("mongoose")
const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"

    },
    status:{
        type : String,
        enum :{
            values:["ignored", "intrested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        } ,
        required: true

    }
},{ timestamps:true }
);
connectionRequestSchema.index({fromUserId : 1, toUserId:1});

connectionRequestSchema.pre("save", async function(next){
   const connectionRequest = this;
   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot Send the connection request to yourself!")
   }
   next();
})
module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema)