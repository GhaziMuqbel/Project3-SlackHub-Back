const Course = require('../models/Course')
const user = require('../models/User')
const assignment = require('../models/Assignment')

const addCourse = async (req, res) => {
  
  console.log(req.body)
  const instructorId = req.params.instructorid

  try {
    const course = new Course(req.body)
    course.Instructor = instructorId
    await course.save()
    console.log(course)
    res.send(course)
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
    newAssignment.course = req.params.id
    const added = await newAssignment.save()
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
const getAllAssignments = async (req, res) => {
  console.log('course Id  ' + req.params.courseId)

  try {
    const allAssignments = await Course.findById(req.params.courseId).populate(
      'Assignments'
    )
    console.log(allAssignments.Assignments)
    res.send(allAssignments.Assignments)
  } catch (err) {
    console.error(`Error in the getAll fuction ${err}`)
  }
}
const getAllCourses = async (req, res) => {
  try {
    const allcourses = await Course.find({})
    console.log(allcourses)
    res.send(allcourses)
  } catch (err) {
    console.error(`error in the getAllCourses ${err}`)
  }
}
const getCourseDetails = async (req, res)=>{
  try{
      const courseDetail = await Course.findById(req.params.courseId)
      res.send(courseDetail)
  }
  catch(err){
    console.error('error in the getcourseDetail '+err)
  }
}
module.exports = {
  addCourse,
  addStudent,
  delete: deleteCourse,
  addAssignments,
  getAllAssignments,
  getAllCourses,
  getCourseDetails
}
