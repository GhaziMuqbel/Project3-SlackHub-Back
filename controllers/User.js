const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { username, email, password, userType } = req.body
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const salt = await bcrypt.genSalt(10)
    const passwordDigest = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      passwordDigest,
      userType
    })
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', {
      expiresIn: '1h'
    })
    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


const Login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  let matched = await middleware.comparePassword(
    user.passwordDigest,
    password
  )
  if (matched) {
    let payload = {
      id: user.id,
      email: user.email
    }
}
module.exports = { register }