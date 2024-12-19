const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { format } = require('date-fns');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'GIOHUB',
    width: isDev ? 1200 : 500,
    height: 800,
    webPreferences: {
      nodeIntegration: false,  // No habilitar nodeIntegration
      contextIsolation: true,  // Mantener contextIsolation por razones de seguridad
      preload: path.join(__dirname, './preload.js'),  // Usar preload para comunicación segura
    }
  });

  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }

  mainWindow.setTitle('GIOHUB');
  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));

  // Enviar la fecha al renderer cuando la página termine de cargar
  const fecha = new Date();
  const fechaFormateada = format(fecha, 'dd/MM/yyyy');

  ipcMain.on('asignatura-seleccionada', (event, asignatura) => {
    console.log(asignatura);
  });

  // Usamos ipcMain.handle para responder con la fecha
  ipcMain.handle('obtener-fecha', () => {
    return fechaFormateada;  // Retorna la fecha en formato ISO
  });

}

// Iniciar la ventana principal
app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});
