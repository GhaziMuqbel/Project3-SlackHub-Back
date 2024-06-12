const Course = require('../models/Course')

const addCourse = async (req, res) => {
  //let { name, Description, Instructors } = req.body
  console.log(req.body)
  /*
  try {
    const course = await new Course(req.body)
    console.log(course.name)
  } catch (err) {
    console.error(
      'this is the error in the add course function in the Courses.JS controller file  ' +
        err
    )
  
  }*/
}
module.exports = { addcourse }
