const mongoose = require("mongoose")
const userSchema = require("./User")
const postSchema = require("./Post")

const User = mongoose.model("User", userSchema)
const Post = mongoose.model("Post", postSchema)

module.exports = {
  User,
  Post,
}
