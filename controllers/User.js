const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const register = async (req, res) => {
  const { username, email, password, userType } = req.body
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const newUser = new User(req.body)
    await newUser.save()

    const chatacc = await axios.put('https://api.chatengine.io/users/',{username: username, secret: username},{headers:{"private-key": process.env.CHAT_APP}})

    console.log(chatacc)

    const token = jwt.sign({ id: newUser._id }, APP, {
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
      const token = jwt.sign(payload, APP, { expiresIn: '1h' })
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}
module.exports = { register, login }
