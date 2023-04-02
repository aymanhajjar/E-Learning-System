const express = require("express")
const app = express()
const auth_routes = require("./routes/auth.routes")
const user_routes = require("./routes/user.routes")
const admin_routes = require("./routes/admin.routes")
require("dotenv").config()

app.use(express.json())

app.use("/auth", auth_routes)
app.use("/user", user_routes)
app.use("/admin", admin_routes)

app.listen(process.env.PORT, (err) => {
  if (err) throw err
  require("./config/dbconfig")
  console.log("Server is listening on port: ", process.env.PORT)
})