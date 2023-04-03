import React, { useState, useEffect } from "react"
import axios from "axios"
import "./dashboard.css"
import { saveAs } from 'file-saver'

function Dashboard() {
    const [courses, setCourses] = useState([])
    const [file_selected, setFileSelected] = useState('')
    const [allcourses, setAllCourses] = useState([])
    const [requested, setRequested] = useState([])
    const [token, setToken] = useState(localStorage.getItem('jwt'))

    useEffect(() => {
        if(token) {
            getCourses()
        }
    }, [token])
    
    function getCourses() {
        axios.get("http://localhost:8000/user/getinfo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setCourses(res.data.user_courses)
            setAllCourses(res.data.all_courses)
        }).catch(error => {
            console.error(error)
          });
    }

    function downloadFile(course_id) {
        axios({
            url: `http://localhost:8000/user/download/${course_id}/${file_selected}`,
            method: 'GET',
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then(res => {
            
        }).catch(error => {
            console.error(error)
          });
    }

    function request(type, course_id) {
        const data = {course_id, type}
        JSON.stringify(data)
        axios({
            url: `http://localhost:8000/user/requestform`,
            method: 'POST',
            data,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then(res => {
            setRequested([...requested, {_id: course_id}])
        }).catch(error => {
            console.error(error)
          });
    }


    return (
      <div className="dashboard-container">
        <h1>Student Dashboard</h1>
        <div className="sections">
            <div className="section-container">

                {courses && courses.map((course) => (
                    <div className="course">
                        <h3>{course.name}</h3>
                        <div className="files-container">
                            <select value={file_selected} onChange={e => setFileSelected(e.target.value)}>
                                {course.files.length > 0 ? course.files.map(file => (
                                    <option value={file._id}>{file.name}</option>
                                )) : <option disabled selected> No Files</option>}
                            </select>
                            <button type="button" className={course.files.length > 0 ? 'download-active' : 'download-disabled'} onClick={() => downloadFile(course._id)}>Download</button>
                        </div>
                    </div>
                ))}

            </div>
            <div className="section-container">
                {allcourses && allcourses.map((course) => (
                    <div className="course">
                        <h3>{course.name}</h3>
                        <button 
                        className={requested.some(cse => cse._id === course._id) ? 'requested' :'enroll-withdraw'}
                        onClick={() => courses.some(cse => cse._id === course._id) ? request('withdraw', course._id) : request('add', course._id)}>

                            {requested.some(cse => cse._id === course._id) ? 'Requested' : (courses.some(cse => cse._id === course._id) ? 'Withdraw' : 'Enroll')}

                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    )
  }
  
  export default Dashboard