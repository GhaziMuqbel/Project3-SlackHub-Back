const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Students: [
    {
      type: Schema.Types.ObjectID,
      ref: 'User'
    }
  ],
  Instructor: {
    type: Schema.Types.ObjectID,
    ref: 'User'
  },
  Assignments: [
    {
      type: Schema.Types.ObjectID,
      ref: 'Assignment'
    }
  ]
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
