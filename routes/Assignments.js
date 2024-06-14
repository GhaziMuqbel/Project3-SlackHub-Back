const express = require("express")
const multer = require("multer")
const router = express.Router()
const assignmentsController = require("../controllers/Assignments")
const UploadAssigment = require("../controllers/Assignments")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post("/", assignmentsController.create)
// router.put("/edit/:id", assignmentsController.edit)

router.post("/edit/:id", assignmentsController.upload)

router.delete("/:id", assignmentsController.delete)

router.get("/:id", assignmentsController.download)
router.post('/' , UploadAssigment.upload)

module.exports = router
