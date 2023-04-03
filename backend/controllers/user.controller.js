const Form = require('../models/FormModel')
const Course = require('../models/CourseModel')
const File = require('../models/FileModel')
const User = require('../models/UserModel')
const jwt = require("jsonwebtoken")
const path = require('path')

exports.requestForm = async (req, res) => {
      const user = req.user

      const { course_id, type } = req.body

      const existing_form = await Form.findOne({ student: user.id, course: course_id, approved: false })

      if(!existing_form) {
            Form.create({
                  student: user.id,
                  course: course_id,
                  type: type
            }).then(() => {
                  res.json({status: 'Form requested'})
            })
      } else {
            res.json({status: 'Form already exists'})
      }
}

exports.getFiles = async (req, res) => {
      const course_id  = req.params.courseid

      const course = Course.findById(course_id)

      if(course.students.includes(req.user.id)) {
            res.json(course.files)
      } else {
            res.json({status: 'User is not enrolled in this course'})
      }
}

exports.getInfo = async (req, res) => {
      const user = await User.findById(req.user.id).populate({path: 'courses', populate: {path: 'files', model: 'File'}})
      const courses = await Course.find().populate("students", "-password")

      res.json({user_courses: user.courses, all_courses: courses})
}

exports.downloadFile = async (req, res) => {
      const course_id = req.params.courseid
      const file_id = req.params.fileid

      const course = await Course.findById(course_id)
      const file = await File.findById(file_id)

      if(course.students.includes(req.user.id)) {
            const file_path = path.join(__dirname, '../public/files/', file.name)
            res.download(file_path, file.name, (err) => {
                  if (err) {
                    console.error(err)
                    res.status(500).json({ message: 'Server error' })
                  }
                })
      } else {
            res.json({status: 'User is not enrolled in this course'})
      }
}