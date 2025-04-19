const adminAuth = (req, res, next)=>{
    const token = 'xyzz';
    const isAdminAuth = token === 'xyz';
    !isAdminAuth ? res.status(401).send("unauthorized") : next(); 
  }
const userAuth = (req, res, next)=>{
    const token = 'xyzz';
    const isuserAuth = token === 'xyz';
    !isuserAuth ? res.status(401).send("unauthorized") : next(); 
  }

  module.exports={adminAuth, userAuth}