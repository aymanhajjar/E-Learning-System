const mongoose = require("mongoose")
const User = require("./UserModel")
const File = require("./FileModel")

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
})

const Course = mongoose.model("Course", courseSchema)

module.exports = Course