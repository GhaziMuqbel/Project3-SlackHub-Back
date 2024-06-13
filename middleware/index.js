const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

//converts the new password to hash during signin
const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  return hashedPassword
}

//compared the hash digest with the login passowrd
const comparePassword = async (storedPassword, password) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword)

  return passwordMatch
}

//sign the payload with the secret key thus creates a token
const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)

  return token
}

const verifyToken = (req, res, next) => {
  //gets the object from local storage and destructure it to get the token
  const { token } = res.locals

  try {
    let payload = jwt.verify(token, APP_SECRET)

    if (payload) {
      res.locals.payload = payload
      return next()
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "Verify Token Error!" })
  }
}

const stripToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]
    // Gets the token from the request headers {authorization: Bearer Some-Token}
    // Splits the value of the authorization header
    if (token) {
      res.locals.token = token
      // If the token exists we add it to the request lifecycle state
      return next()
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "Strip Token Error!" })
  }
}

module.exports = {
  stripToken,
  verifyToken,
  createToken,
  comparePassword,
  hashPassword,
}
