const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordDigest: {
      type: String,
      required: true,
    },
    userType: {
      type: Boolean,
     
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
    coursesAdd: {
      type: Schema.Types.ObjectId,
      ref: "courses",
    },
    secret:{
      type: String
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
