const { ipcRenderer } = require('electron')
const course_table = document.getElementById('course-table')
const form_table = document.getElementById('form-table')
const select_courses = document.getElementById('courses-select')
const course_btn = document.getElementById('course-btn')
const file = document.getElementById('file')
const filename = document.getElementById('file-name')
const course_name = document.getElementById('course-name')
const course_duration = document.getElementById('course-duration')
const file_btn = document.getElementById('file-btn')
const axios = require('axios')

ipcRenderer.invoke('get-courses').then(data => {
    data.forEach(course => {
        let student_list = ''
        course.students.forEach(student => {
            student_list += student.name + ', '
        })
        course_table.innerHTML += `<tr>
        <td>${course.name}</td> 
        <td>${student_list}</td>
        </tr>`
        select_courses.innerHTML += `<option value="${course._id}">${course.name}</option>`
    })
  }).catch(error => {
    console.error(error)
  })

ipcRenderer.invoke('get-forms').then(data => {
    data.forEach(async (form) => {
        if(!form.pending) {
        form_table.innerHTML += `<tr>
        <td>${form.student.name}</td> 
        <td>${form.course.name}</td>
        <td>${form.type}</td>
        <td>${form.approved ? 'Approved' : 'Rejected'}</td></tr>`
        } else {
            form_table.innerHTML += `<tr>
            <td>${form.student.name}</td> 
            <td>${form.course.name}</td>
            <td>${form.type}</td>
            <td class="action-btns"><button type="button" onclick="approveForm(approve, ${form._id})">Approve</button>
        <button type="button" onclick="approveForm(reject, ${form._id})">Reject</button>
        </td></tr>`
        }
    })
  }).catch(error => {
    console.error(error)
  })

course_btn.addEventListener('click', () => {
    let name = course_name.value
    let duration = course_duration.value
    ipcRenderer.send("submit-course", { "name": name, "duration": duration })
    ipcRenderer.on('course-sent', (data) => {
        course_btn.innerHTML = 'Course Added!'
        setTimeout(() => {
            course_btn.innerHTML = 'Add Course'
        }, 2000)
    })
})

file_btn.addEventListener('click', () => {
    const file_data = new FormData()
    file_data.append('file', file.files[0])
    file_data.append('course_id', select_courses.value)
    file_data.append('filename', filename.value)
    ipcRenderer.send("get-jwt")
    ipcRenderer.on('jwt-sent', (event, token) => {
        axios.post('http://localhost:8000/admin/uploadfile' , file_data,  {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        file_btn.innerHTML = 'File Added!'
        setTimeout(() => {
            file_btn.innerHTML = 'Add File'
        }, 2000)
      })
    })
})