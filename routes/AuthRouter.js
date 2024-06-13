const router = require("express").Router()
const controller = require("../controllers/AuthController")

router.post("/login", controller.Login)
router.post("/register", controller.Register)

module.exports = router
