const { ipcRenderer } = require('electron');
const axios = require('axios');

// Make API call to retrieve data
axios.get('https://api.example.com/data')
  .then(response => {
    // Send data to main process
    ipcRenderer.send('api-data', response.data);
  })
  .catch(error => {
    console.error(error);
  });