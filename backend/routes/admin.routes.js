const { Router } = require("express")
const router = Router()
const { approveForm, getCourses, addCourse, uploadFile, getForms } = require("../controllers/admin.controller")
const { authAdmin } = require("../middleware/admin.middleware")

router.post("/approveform", authAdmin, approveForm)
router.get("/getcourses", authAdmin, getCourses)
router.get("/getforms", authAdmin, getForms)
router.post("/addcourse", authAdmin, addCourse)
router.post("/uploadfile", authAdmin, uploadFile)

module.exports = router