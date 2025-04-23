   const validator = require("validator")
   const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid!")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("emailID is not valid!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("please try strong password !")
    }
   }
   const validateLogin = (req) =>{
    const {emailId} = req.body
    if(!validator.isEmail(emailId)){
        throw new Error("Enter Valid Email ID")
    }
   }
   module.exports ={ validateSignUpData, validateLogin};