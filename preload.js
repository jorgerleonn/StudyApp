const { contextBridge, ipcRenderer } = require('electron');

// Exponer una API segura para interactuar con el proceso principal
contextBridge.exposeInMainWorld('electron', {
  recibirFecha: () => ipcRenderer.invoke('obtener-fecha')
});



