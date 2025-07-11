const mongoose = require("mongoose");
const validator = require ("validator")
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 1,
    maxlength: 20,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email address")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Try strong password")
      }
    }
  },
  age: {
    type: Number,
    min: 15,
    max:100
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not valid",
    },
  },  
  photoUrl: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error ("profile URL is not valid")
      }
    }
  },
  about: {
    type: String,
    default: "This is a default about of the user ",
  },
  skills: {
    type: [String],
  },
},{timestamps:true});
userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passwordHash =user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
  return isPasswordValid;
} 

userSchema.methods.getJWT = async function (){
  const user = this;

  const token = await jwt.sign({_id:user._id},"Dev@Tinder$2810",{expiresIn:"1d"})
  return token;
}
module.exports = mongoose.model("User", userSchema);
