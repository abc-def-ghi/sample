const jwt = require("jsonwebtoken"); 
const verifyToken = (req, res, next) => { 
  // get bearer token 
  let bearerToken = req.headers.authorization; 
  // check if bearer token is present 
  if (!bearerToken) { 
    res.send({ message: "Unauthorized user" }); 
  } else { 
    // extract token from bearer token 
    let token = bearerToken.split(" ")[1]; 
    //verify token using secret key 
    try { 
      let decodedToken = jwt.verify(token, "abcdef"); 
      next(); 
    } catch (err) { 
    console.log(err.message)
      res.send({ message: " Relogin to continue. Session expired." }); 
    } 
  } 
}; 
module.exports = verifyToken;