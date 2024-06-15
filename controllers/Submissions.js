const Assignment = require("../models/Assignment")

const upload = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
    if (!assignment) {
      return res.status(404).send("Assignment not found")
    }

    const submission = {
      studentName: req.body.studentName,
      filePath: req.file.path,
    }

    assignment.submissions.push(submission)
    await assignment.save()
    res.status(201).send(submission)
  } catch (error) {
    res.status(400).send(error)
  }
}

const download = (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.fileName)
  res.download(filePath)
}

module.exports = {
  upload,
  download
}
