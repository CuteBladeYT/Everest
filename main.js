// Modules to control application life and create native browser window
const electron = require("electron");
const { app } = electron;
const path = require("path");
path.join("./storage/");

const express = require("express");
const http = require("http");

const S_PORT = 5321;
const S_URL = "http://127.0.0.1:" + S_PORT;

const exapp = express();
const httpserver = http.createServer(exapp);

exapp.use(express.static(path.join(__dirname, "/storage/")));

httpserver.listen(S_PORT);

var mainWindow;

var init_branch = "";

function createWindow () 
{
    console.log(__dirname.replaceAll("\\", "/"));
    
    // Create the browser window.
    mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600,
        title: "Everest" + (init_branch.length == 0 ? "" : " " + init_branch.toUpperCase()),
        icon: "storage/system/assets/icon/icon.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInSubFrames: true,
            webSecurity: false,
            webviewTag: true,
        }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.setFullScreen(true);

    // and load the index.html of the app.
    // mainWindow.loadFile("storage/index.html");
    mainWindow.loadURL(S_URL + "/index.html");
    
    // Open the DevTools if running in development mode.
    if (init_branch == "dev")
        mainWindow.webContents.openDevTools();

    // expose window.everest
    mainWindow.webContents.addListener("did-finish-load", 
    () => {
        mainWindow.webContents.send("everest_init", 
            {
                branch: init_branch
            }
        );
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(
() => {
    console.log("RUNNING EVEREST ON " + S_URL);

    if (process.argv.includes("--nightlyMode"))
        init_branch = "nightly";
    if (process.argv.includes("--devMode"))
        init_branch = "dev";
    
    createWindow();

    app.on("activate", 
    function () {
        // On macOS it"s common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron.BrowserWindow.getAllWindows().length === 0) 
            createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", 
function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
