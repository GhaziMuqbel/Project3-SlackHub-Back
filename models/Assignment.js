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
    code: String,
    submissions: [submissionSchema],
    assignmentFiles: [{ type: Schema.Types.ObjectId, ref: "UploadAssignment" }]
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
