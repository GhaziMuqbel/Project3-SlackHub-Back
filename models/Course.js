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
  Student: [
    {
      type: Schema.Types.ObjectID,
      ref: 'Student'
    }
  ],
  Instructors: [
    {
      type: Schema.Types.ObjectID,
      ref: 'Student'
    }
  ]
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
