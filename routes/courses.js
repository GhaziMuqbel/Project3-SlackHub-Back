const express = require('express')
const router = express.Router()
const courseController = require('../controllers/Courses')

router.post('/newCourse', courseController.addCourse)
//router.put('/:courseId', courseController.addAssignments)
router.put('/addStudent/:id', courseController.addStudent)
router.delete('/deleteCourse/:id', courseController.delete)
module.exports = router
