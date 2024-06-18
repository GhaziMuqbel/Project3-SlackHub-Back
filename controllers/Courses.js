const Course = require('../models/Course')
const user = require('../models/User')
const assignment = require('../models/Assignment')

const addCourse = async (req, res) => {
  //let { name, Description, Instructors } = req.body
  console.log(req.body)

  try {
    const course = new Course(req.body)
    await course.save()
    console.log(course)
  } catch (err) {
    console.error(
      'this is the error in the add course function in the Courses.JS controller file  ' +
        err
    )
  }
}
const addStudent = async (req, res) => {
  console.log(req.body)

  const StudentID = req.body.StudentID
  console.log('StudentID' + StudentID)
  const updateIt = req.params.id

  try {
    const newStudent = await Course.findById(updateIt)
    newStudent.Students.push(StudentID)
    newStudent.save()
  } catch (err) {
    console.error(
      'This is an error in the add Student Function in the Courses contoller' +
        err
    )
  }
}

const addAssignments = async (req, res) => {
  console.log(req.body)

  const updateIt = req.params.id

  try {
    const newAssignment = new assignment(req.body)
    newAssignment.course= req.params.id
    const added  = await newAssignment.save()
    const addIt = await Course.findById(updateIt)
    addIt.Assignments.push(added._id)
    addIt.save()
    res.send(addIt)
  } catch (err) {
    console.error(
      'This is an error in the add Student Function in the Courses contoller' +
        err
    )
  }
}
const deleteCourse = async (req, res) => {
  console.log(req.params.id)

  try {
    await Course.findOneAndDelete(req.params.id)
    console.log('Done Deleting the course')
  } catch (err) {
    console.error('This error is in the Delete in Courses cont' + err)
  }
}

module.exports = { addCourse, addStudent, delete: deleteCourse, addAssignments }
