const exp = require("express"); 
const userApp = exp.Router(); 
const User = require("./userModel"); 
const bcryptjs = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const verifyToken = require("./verifyToken"); 
userApp.use(exp.json()); 
 
//To read all users 
userApp.get("/users", async (req, res) => { 
  try { 
    const userList = await User.find(); 
    res.send({ message: "users", payload: userList }); 
  } catch (err) { 
    res.send({ message: "Error", payload: err.message }); 
  } 
}); 
 
//To create a new user 
userApp.post("/user", async (req, res) => { 
  try { 
    let newUser = req.body; 
    //hash password 
    let hashedPassword = await bcryptjs.hash(newUser.password, 10); 
 
    //replace password with hashed password 
    newUser.password = hashedPassword; 
 
    let UserDoc = await User.create(newUser); 
    await UserDoc.save(); 
    res.send({ message: "New user created" }); 
  } catch (err) { 
    res.send({ message: "Error", payload: err.message }); 
  } 
}); 
//To get a user using username 
userApp.get("/users/:username", async (req, res) => { 
    try { 
      const user = await User.findOne({ username: req.params.username }); 
      if (user) { 
        res.send({ message: "User", payload: user }); 
      } else { 
        res.send({ message: "User not found", payload: null }); 
      } 
    } catch (err) { 
      res.send({ message: "Error", payload: err.message }); 
    } 
  }); 
   
  //To delete product 
  userApp.delete("/user/:username", async (req, res) => { 
    try { 
      const userName = req.params.username; 
      let dbRes = await User.findOneAndDelete({ username: userName }); 
      if (dbRes) { 
        res.send({ message: "User deleted" }); 
      } else { 
        res.send({ message: "User not found to delete" }); 
      } 
    } catch (err) { 
      res.send({ message: "Error", payload: err.message }); 
    } 
  }); 
  // user login 
  userApp.post("/login", async (req, res) => { 
    let userCredObj = req.body; 
    // verify username 
    let user = await User.findOne({ username: userCredObj.username }); 
    if (user === null) { 
      res.send({ message: "Invalid username" }); 
    } else { 
  // compare password 
      let result = await bcryptjs.compare(userCredObj.password, user.password); 
      if (result == false) { 
        res.send({ message: "Invalid password" });
      }
      else { 
        //create JWT token 
        let signedToken = jwt.sign({ username: user.username }, "abcdef", { 
          expiresIn: "1h", 
        }); 
        res.send({ 
          message: "login successful!", 
          token: signedToken, 
          user: user, 
        }); 
      } 
    } 
  }); 
  //Protected route 
  userApp.get("/protected", verifyToken, async (req, res) => { 
    res.send({ message: "Protected Data" }); 
  }); 
  module.exports = userApp; 