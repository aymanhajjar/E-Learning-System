const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

exports.authAdmin = async (req, res, next) => {

  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(403).json({ status: "Forbidden" })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(decoded.id, "-password")

    req.user = user

    if (req.user.type === "admin") next()
    else return res.status(403).json({ status: "Forbidden" })
  } catch (e) {
    return res.status(500).json({ message: "Server Error" })
  }

}