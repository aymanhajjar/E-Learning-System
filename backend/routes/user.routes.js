const { Router } = require("express")
const router = Router()
const { requestForm, getFiles, downloadFile, getInfo } = require("../controllers/user.controller")
const { authUser } = require("../middleware/auth.middleware")

router.post("/requestform", authUser, requestForm)
router.get("/getfiles/:courseid", authUser, getFiles)
router.get("/getinfo", authUser, getInfo)
router.get("/download/:courseid/:fileid", authUser, downloadFile)


module.exports = router