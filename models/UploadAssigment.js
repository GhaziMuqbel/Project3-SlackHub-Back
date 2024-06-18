const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadAssignmentSchema = new Schema({
  filename: String,
  contentType: String,
  data: Buffer,
});

const UploadAssignment = mongoose.model('UploadAssignment', uploadAssignmentSchema);

module.exports = UploadAssignment;