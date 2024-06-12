const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
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
      type: Boolean,
      require: true
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
