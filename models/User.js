const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordDigest: {
    type: String,
    required: true
  },
  userType: {
    type: DataTypes.ENUM('student', 'instructor'),
    require: true
  }
})
module.exports = mongoose.model('User', userSchema);