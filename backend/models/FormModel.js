const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  type: {
    type: String,
    enum: ['add', 'withdraw'],
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }
})

const Form = mongoose.model("Form", formSchema);

module.exports = Form