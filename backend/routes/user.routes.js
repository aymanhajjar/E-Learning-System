const { Router } = require("express")
const router = Router()
const { requestForm } = require("../controllers/user.controller")
const { authUser } = require("../middleware/auth.middleware")

router.post("/requestform", authUser, requestForm)
// router.post("/register", register)

module.exports = router