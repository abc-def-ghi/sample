const mongoose = require("mongoose"); 
const userSchema = new mongoose.Schema({ 
  username: { 
    type: String, 
    required: true, 
    unique: true, 
  }, 
  password: { 
    type: String, 
    required: true, 
  }, 
  age: { 
    type: Number, 
    required: true, 
    min: 18, 
    max: 50, 
  }, 
  country: { 
    type: String, 
    maxLength: 50, 
  }, 
}); 
const User = mongoose.model("user", userSchema); 
module.exports = User; 