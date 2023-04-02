const Form = require('../models/FormModel')
const Course = require('../models/CourseModel')
const User = require("../models/UserModel")
const File = require('../models/FileModel')
const jwt = require("jsonwebtoken")
const path = require('path')
const formidable = require('formidable')
const fs = require('fs')

exports.approveForm = async (req, res) => {
      const { form_id, approved } = req.body

      Form.updateOne(
        { _id: form_id }, 
        { $set: { approved: approved, pending: false } },
        (err) => {
          if (err) {
            console.error(err)
            return res.status(500).json({ status: 'Server Error' })
          }
          res.json({ status: 'Form updated successfully' })
        }
      )

      if(approved) {
        const approved_from = await Form.findById(form_id)
        const course = await Course.findById(approved_from.course)
        const student_id = approved_from.student
        const student = await User.findById(student_id)

        if(approved_from.type == 'add') {
            course.students.push(student.id)
            student.courses.push(course.id)
            course.save()
            student.save()
        } else {
            course.students.pull(student.id)
            student.courses.pull(course.id)
            course.save()
            student.save()
        }
      }
}

exports.addCourse = async (req, res) => {
    const { name, duration } = req.body

    Course.create({ name, duration }).then(() => {
        res.json({ status: 'Course created successfully'})
    })
}

exports.getCourses = async (req ,res) => {
    const courses = await Course.find().populate("students", "-password")

    res.json(courses)
}

exports.uploadFile = async (req, res) => {
    const request = formidable({ multiples: true })

    request.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data", err)
        } else {
          const { course_id, filename } = fields
      
          if (files.file) {
            const file = files.file
            const file_path = path.join(__dirname, "../public/files/", filename);
            const course = await Course.findById(course_id)
      
            fs.rename(file.path, file_path, async (err) => {
              if (err) console.error(err);
      
              const new_file = await File.create({name: filename, path: file_path})
              course.files.push(new_file.id)
              course.save()
      
              res.json({ status: "File added successfully" })
            });
          } else {
              res.status(400).json({ status: "No file provided" })
          }
        }
      });
}