const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  const { email, password } = req.body

  if(email && password) {
    const existing_user = await User.findOne({ email })

    if (existing_user) return res.status(409).json({ status: "Email already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    User.create({ email, password: hashedPassword }).then(user => {
        const { password: hashedPassword, ...newUser } = user.toJSON()
        res.json({ status: "User created", user: newUser })
    })

  } else {
    res.status(400).json({status: "Bad request"})
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) return res.status(404).json({ status: "Wrong email/password" })

  const isMatched = user.matchPassword(password)
  
  if (!isMatched) return res.status(404).json({ status: "Wrong email/password" })

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY)

  res.json({ token })

}

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email, type: 'admin' })
  
    if (!user) return res.status(404).json({ status: "Wrong email/password" })
  
    const isMatched = user.matchPassword(password)
    
    if (!isMatched) return res.status(404).json({ status: "Wrong email/password" })
  
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY)
  
    res.json({ token })
  
  }