const Assignment = require('../models/Assignment')

// Function to get assignment details including notes
const getAssignmentDetails = async (assignmentId) => {
  return await Assignment.findById(assignmentId)
}

// Function to add a note to an assignment
const addNoteToAssignment = async (assignmentId, note) => {
  const assignment = await Assignment.findById(assignmentId)
  if (assignment) {
    assignment.notes = assignment.notes ? assignment.notes + '\n' + note : note
    await assignment.save()
    return assignment.notes
  }
  throw new Error('Assignment not found')
}

module.exports = {
  getAssignmentDetails,
  addNoteToAssignment
}
