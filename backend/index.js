const express = require("express")
const app = express()
const route = require("./routes/auth.routes")
require("dotenv").config()

app.use(express.json())

app.use("/", route)

app.listen(process.env.PORT, (err) => {
  if (err) throw err
  require("./config/dbconfig")
  console.log("Server is listening on port: ", process.env.PORT)
})