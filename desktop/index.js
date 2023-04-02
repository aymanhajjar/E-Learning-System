const { app, BrowserWindow, ipcMain, session } = require('electron')
const { join } = require('path')
const axios = require('axios')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  let token = ''

  session.defaultSession.cookies.get({ name: 'jwt' })
  .then(cookies => {
    if (cookies.length === 0) {
      mainWindow.loadFile(join(__dirname, 'login.html'))
    } else {
      mainWindow.loadFile(join(__dirname, 'main.html'))
    }
  })

  ipcMain.on('submit-login', (event, data) => {

    axios.post('http://localhost:8000/auth/admin/login', data)
    .then(res => {
      token = res.data.token
      session.defaultSession.cookies.set({
        url: 'http://localhost',
        name: 'jwt',
        value: res.data.token
      })
        .then(() => {
          mainWindow.loadFile('main.html')
        })
        .catch((error) => {
          console.error(`Error setting session cookie: ${error.message}`)
        })
    }).catch(err => {
      console.error(err)
    })

  });

  ipcMain.on('get-jwt', (event, data) => {

    event.sender.send("jwt-sent", token)

  });

  ipcMain.handle('get-courses', async (event, data) => {
    try {
      const response = await axios.get('http://localhost:8000/admin/getcourses' , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  })

  ipcMain.handle('get-forms', async (event, data) => {
    try {
      const response = await axios.get('http://localhost:8000/admin/getforms' , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  })

  ipcMain.on('submit-course', async (event, data) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/addcourse' , data,  {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      event.sender.send("course-sent", response.data)
    } catch (error) {
      console.error(error)
      return []
    }
  })


  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
