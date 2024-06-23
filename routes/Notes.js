const express = require('express');
const router = express.Router();
const {
  getAssignmentDetails,
  addNoteToAssignment,
} = require('../controllers/Notes');

// Get notes for a specific assignment
router.get('/get/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const assignment = await getAssignmentDetails(assignmentId);
    res.json(assignment.notes || '');
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Server error');
  }
});

// Add a note to a specific assignment
router.post('/add', async (req, res) => {
  const { assignmentId, content, userId, userName } = req.body;
  const note = `${userName}: ${content}`;
  try {
    const updatedNotes = await addNoteToAssignment(assignmentId, note);
    res.json({ notes: updatedNotes });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
