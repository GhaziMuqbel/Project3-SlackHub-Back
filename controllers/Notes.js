const Assignment = require('../models/Assignment');

// Function to get assignment details including notes
const getAssignmentDetails = async (assignmentId) => {
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    throw new Error('Assignment not found');
  }
  return assignment;
};

// Function to add a note to an assignment
const addNoteToAssignment = async (assignmentId, note) => {
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    throw new Error('Assignment not found');
  }
  assignment.notes = assignment.notes ? assignment.notes + '\n' + note : note;
  await assignment.save();
  return assignment.notes;
};

module.exports = {
  getAssignmentDetails,
  addNoteToAssignment,
};

