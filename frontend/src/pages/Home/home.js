import React, { useState, useEffect } from "react"
import axios from "axios"
import "./home.css"
import { useNavigate } from "react-router-dom";

function Home() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [regOpen, setRegOpen] = useState(false)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPass, setLoginPass] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPass, setRegPass] = useState('')
    const [regName, setRegName] = useState('')
    const [errormsg, setErrorMsg] = useState('')
    const navigate = useNavigate();
  
    function handleFormOpen(form) {
        if(form == 'login') {
            setLoginOpen(true)
            setRegOpen(false)
            setErrorMsg()
        } else {
            setLoginOpen(false)
            setRegOpen(true)
            setErrorMsg()
        }
    }

    function login() {
        setErrorMsg()
        const data = {email: loginEmail, password: loginPass}
        JSON.stringify(data)
        axios.post("http://localhost:8000/auth/login", data)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
            navigate('/dashboard')
        }).catch(error => {
            console.error(error)
            if(error) {
                setErrorMsg('Wrong Email/Password')
            }
          });
    }

    function register() {
        setErrorMsg()
        const data = {email: regEmail, password: regPass, name: regName}
        JSON.stringify(data)
        axios.post("http://localhost:8000/auth/register", data)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
            navigate('/dashboard')
        }).catch(error => {
            console.error(error)
            if(error) {
                setErrorMsg('Wrong Email/Password')
            }
          });
    }

    return (
      <div className="main-container">
        <div className="greeting">
            <h1>E-LEARNING IS THE FUTURE!</h1>
            <div className="login-buttons">
                <button type="button" onClick={() => handleFormOpen('reg')}>Sign Up</button>
                <button type="button" onClick={() => handleFormOpen('login')}>Log In</button>
            </div>
        </div>

        <div className="forms-container">
            <div className={loginOpen ? 'loginopen' : 'loginclosed'}>
                <input type="text" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)}/>
                <button type="button" onClick={() => login()}>Log In</button>
                {errormsg && <span>{errormsg}</span>}
            </div>
            <div className={regOpen ? 'loginopen' : 'loginclosed'}>
                <input type="text" placeholder="Name" value={regName} onChange={e => setRegName(e.target.value)}/>
                <input type="email" placeholder="Email" value={regEmail} onChange={e => setRegEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={regPass} onChange={e => setRegPass(e.target.value)}/>
                <button type="button" onClick={() => register()}>Register</button>
                {errormsg && <span>{errormsg}</span>}
            </div>
        </div>
      </div>
    )
  }
  
  export default Home