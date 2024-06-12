const User = require('../models/User')
const bcrypt = require('bcrypt')
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
    res.status(200).json({ token, user: newUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
    }
    const matched = await bcrypt.compare(password, user.passwordDigest)
    if (matched) {
      const payload = {
        id: user._id,
        email: user.email
      }
      const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' })
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}
module.exports = { register, login }
