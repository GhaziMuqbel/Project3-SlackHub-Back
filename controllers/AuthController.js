const User = require("../models/User")
const middleware = require("../middleware")
const axios = require('axios')

const Login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }

    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    res.status(401).send({ status: "Error", msg: "An error has occurred!" })
    throw error
  }
}

const Register = async (req, res) => {
  console.log("register function")
  try {
    const { username, email, password, userType } = req.body
    

    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      const user = new User({
        username,
        email,
        passwordDigest,
        userType,
      })
      console.log("user created")
      const chatacc = await axios.put('https://api.chatengine.io/users/',{username: username, secret: username},{headers:{"private-key": process.env.CHAT_APP}})

    console.log(chatacc.data.secret)
    user.secret= chatacc.data.secret

    await user.save()
    console.log("user created")
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  Login,
  Register,
}
