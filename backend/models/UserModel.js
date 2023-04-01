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

const User = mongoose.model("User", userSchema);

module.exports = User;
