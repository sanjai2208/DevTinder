const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("emailID is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please try strong password !");
  }
};
const validateLogin = (req) => {
  const { emailId } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Enter Valid Email ID");
  }
};
const validateProfileEditData = (req) => {
const {photoUrl, about} = req.body;
  const allowedEditField = [
    "skills",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
  ];
  const isEditAllowed = Object.keys(req.body).every(keys => allowedEditField.includes(keys))
  if(!photoUrl && !about){
    return  isEditAllowed
  }else{
    if(!validator.isURL(photoUrl)){
        throw new Error("invalid photo url")
     }
     else if(!validator.isLength(about, {min:10, max:300}))
     {
        throw new Error("about should be 10 to 300 characters")
     }
      return  isEditAllowed

    }
 
};
const validateProfilePassword = (req) => {
  const {password} = req.body;
  if(!password){
    throw new Error ("Enter password")
  }
  const isStrongPassword = validator.isStrongPassword(password)
  return isStrongPassword

}
module.exports = { validateSignUpData, validateLogin ,validateProfileEditData, validateProfilePassword};
