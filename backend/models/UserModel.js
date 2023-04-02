const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Course = require('./CourseModel')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
//   next()
// })

userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
