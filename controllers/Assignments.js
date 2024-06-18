const Assignment = require('../models/Assignment')
const Courses = require('../models/Course')
const Assignfile = require('../models/UploadAssignment')

const create = async (req, res) => {
  const { title, description, code, crId } = req.body
  try {
    const newAssignment = new Assignment({ title, description, code })
    if (req.file) {
      const assignmentFile = new Assignfile({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer
      })
      const savedAssignmentFile = await assignmentFile.save()
      newAssignment.assignmentFiles.push(savedAssignmentFile._id)
    }
    await newAssignment.save()

    const updateCourse = await Courses.findById(crId)
    updateCourse.Assignments.push(newAssignment._id)
    await updateCourse.save()

    res.status(201).send(newAssignment)
  } catch (error) {
    res.status(400).send(error)
  }
}

const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: 'Assignment deleted successfully' })
  } catch (error) {
    res.status(400).send(error)
  }
}

const upload = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
    if (!assignment) {
      return res.status(404).send('Assignment not found')
    }

    const submission = {
      studentName: req.body.studentName,
      code: req.body.code
    }

    assignment.submissions.push(submission)
    await assignment.save()
    res.status(201).send(submission)
  } catch (error) {
    res.status(400).send(error)
  }
}

const download = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.fileName)
  res.download(filePath)
}

module.exports = {
  create,
  upload,
  download,
  delete: deleteAssignment
}
