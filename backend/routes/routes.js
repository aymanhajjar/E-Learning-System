const { Router } = require("express");
const router = Router();
const { hello } = require("../controllers/controller")

router.get("/", hello)

module.exports = router