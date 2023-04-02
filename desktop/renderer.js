const { ipcRenderer } = require('electron');
const email = document.getElementById('email')
const password = document.getElementById('password')
const login_btn = document.getElementById('login-btn')

// Make API call to retrieve data
login_btn.addEventListener('click', () => {
    const email_value = email.value
    const password_value = password.value
    ipcRenderer.send("submit-login", { "email": email_value, "password": password_value });
}) 
