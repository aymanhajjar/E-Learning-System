const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')

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

  mainWindow.loadFile(join(__dirname, 'index.html'))

  ipcMain.on('api-data', (event, data) => {
    // Update HTML content with data
    document.getElementById('data').innerHTML = JSON.stringify(data);
  });

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
