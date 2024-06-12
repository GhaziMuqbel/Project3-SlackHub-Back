const express = require('express')
const router = express.Router()
const courseController = require('../controllers/Courses')

router.post('/newCourse', courseController.addCourse)
module.exports = router
