const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
}, { timestamps: true });

const submissionSchema = new Schema({
  studentName: { type: Schema.Types.ObjectId, ref: 'User' },
  code: String,
  submittedDate: { type: Date, default: Date.now },
}, { timestamps: true });

const assignmentSchema = new Schema({
  title: String,
  description: String,
  submission: [submissionSchema],
  assignfile: { type: Schema.Types.ObjectId, ref: 'UploadAssignment' },
  discussions: { type: Schema.Types.ObjectId, ref: 'discussion' },
  course: { type: Schema.Types.ObjectId, ref: 'course' },
  notes: { type: [noteSchema], default: [] },
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;

