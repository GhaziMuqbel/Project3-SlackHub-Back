const User = require("../models/User")
const middleware = require("../middleware")

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
  try {
    const { username, email, password, userType } = req.body
    console.log(req.body)

    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      const user = await User.create({
        username,
        email,
        passwordDigest,
        userType,
      })
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
