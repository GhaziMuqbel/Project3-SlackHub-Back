const express = require("express")
const multer = require("multer")
const router = express.Router()
const assignmentsController = require('../controllers/Assignments')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('file'), assignmentsController.create)
router.post('/edit/:id', assignmentsController.upload)
router.delete('/:id', assignmentsController.delete)
router.get('/:id', assignmentsController.download)

module.exports = router
