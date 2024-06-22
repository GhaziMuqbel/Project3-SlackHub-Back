const router = require('express').Router()
const userController = require('../controllers/User')
// const middleware = require('../middleware')

//router.post('/login', controller.Login)
router.get('/getUsers', userController.getUsers)
router.get('/getstudents',userController.getStudents )

module.exports = router;