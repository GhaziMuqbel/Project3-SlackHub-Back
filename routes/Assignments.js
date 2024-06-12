const express = require("express")
const router = express.Router()
const assignmentsController = require("../controllers/Assignments")

router.post("/", assignmentsController.create)
// router.put("/edit/:id", assignmentsController.edit)

router.post("/edit/:id", assignmentsController.upload)

router.delete("/:id", assignmentsController.delete)

router.get("/:id", assignmentsController.download)

module.exports = router
