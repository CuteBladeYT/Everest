// ================================================================
// Main file of Everest
// UnitedCatdom 2025
// ================================================================

// Core modules
import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as conf from "./config.json";

import * as Electron from "electron";

// Core variables
var argv: string[] = process.argv; argv.splice(0, 2);

// var settings: object = JSON.parse(fs.readFileSync("./config.json", "utf-8"))!;

const SERVER_PORT: number = conf.server.port|3003;
const SERVER_URL: string = `${conf.server.address}:${SERVER_PORT}`;

// HTTP Server
const app = express();
const httpserver = new http.Server(app);

const sitedir = path.join(__dirname, "os");

app.use(express.static(sitedir));

httpserver.listen(SERVER_PORT);

console.log(`Server listened on ${SERVER_URL}`);

// Electron
const eapp = Electron.app;

eapp.whenReady().then(
    () => {

        if (!argv.includes("--remote"))
        {
            eapp_fn.createMainWindow();
        }

    }
)

eapp.on(
    "window-all-closed",
    () => {

        

    }
)

var mainWindow: Electron.BrowserWindow = null;

var eapp_fn = {
    "createMainWindow": 
        () => {
            mainWindow = new Electron.BrowserWindow({
                "title": "Everest",
                "icon": "./os/fs/sys/icon.png",
                "fullscreen": true,
                "webPreferences":
                {
                    "preload": path.join(__dirname, "preload.js"),
                    // "nodeIntegration": true,
                    "webviewTag": true
                }
            });

            mainWindow.setMenuBarVisibility(false);
            
            mainWindow.loadURL(SERVER_URL);
        }
}