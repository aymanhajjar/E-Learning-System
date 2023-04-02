const { Router } = require("express")
const router = Router()
const { login, register, adminLogin } = require("../controllers/auth.controller")

router.post("/login", login)
router.post("/admin/login", adminLogin)
router.post("/register", register)

module.exports = router