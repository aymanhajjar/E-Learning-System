const { Router } = require("express")
const router = Router()
const { approveForm, getCourses, addCourse, uploadFile } = require("../controllers/admin.controller")
const { authAdmin } = require("../middleware/admin.middleware")

router.post("/approveform", authAdmin, approveForm)
router.get("/getcourses", authAdmin, getCourses)
router.post("/addcourse", authAdmin, addCourse)
router.post("/uploadfile", authAdmin, uploadFile)

module.exports = router