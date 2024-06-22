const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadAssignmentSchema = new Schema({
  pdf: String,
  
});

const UploadAssignment = mongoose.model('UploadAssignment', uploadAssignmentSchema);

module.exports = UploadAssignment;