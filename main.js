//================================//
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const cpspawn = require("child_process").spawn;


//================================//
// Create the application window
function createWindow() {
  //================================//
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "system/icon/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      plugins: true
    }
  });

  //================================//
  // Init.
  mainWindow.loadFile("index.html");
  mainWindow.maximize();
  mainWindow.setFullScreen(true);
  mainWindow.setMenuBarVisibility(false);

  //================================//
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

//================================//
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//================================//
// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});