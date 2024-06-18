const mongoose = require("mongoose")
const Schema = mongoose.Schema

const submissiontSchema = new Schema(
  {
    studentName: { type: Schema.Types.ObjectId, ref: "User" },
    submittedDate: String,
  },
  { timestamps: true }
)

const assignmentSchema = new Schema(
  {
    title: String,
    description: String,


    submission: [submissiontSchema],

    assignfile:{
      type: Schema.Types.ObjectId,
    ref: 'assignFile'
    },
    discussions:{
      type: Schema.Types.ObjectId,
    ref: 'discussion'
    },
    course:{
      type: Schema.Types.ObjectId,
    ref: 'course'
    }
  },
  { timestamps: true }
)

const Assignment = mongoose.model("Assignment", assignmentSchema)

module.exports = Assignment
