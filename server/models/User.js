
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

userSchema.methods.setPassword = async function(pw){
  this.password = await bcrypt.hash(pw, 10);
}

userSchema.methods.validatePassword = async function(pw){
  return await bcrypt.compare(pw, this.password);
}

module.exports = mongoose.model('User', userSchema);
