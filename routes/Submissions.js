const express = require("express")
const router = express.Router()
const submissionsController = require("../controllers/Submissions")

router.post("/edit/:id", submissionsController.upload)

router.get("/:id", submissionsController.download)

module.exports = router
