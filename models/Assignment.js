const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema(
  {
    studentName: { type: Schema.Types.ObjectId, ref: "User" },
    code: String,
    submittedDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

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
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
