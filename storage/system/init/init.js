// Import modules

// for core api from electron
const { ipcRenderer } = require("electron");

// modules
import * as cfg from "/config.js";
import { cfg as config } from "/config.js";
import * as syslog from "/system/syslog.js";
import * as env from "/env/env.js";
import * as dom from "/system/api/dom.js";

ipcRenderer.on("everest_init", 
(_0, vars) => {
    syslog.clear();
    syslog.msg("System init started");

    window.everest = vars;
    window.everest.root = document;

    console.log(window.everest.root);
    

    dom._set_domroot(window.everest.root);

    init_();
});

function init_() 
{
    var initBranch = window.everest.branch;
    setTimeout(
        async () => {
        document.body.innerHTML += `<div id="env"> <div id="desktop"></div> <div id="windowmanager"></div> </div>`;

        cfg.check_confs();
        cfg.read_confs();

        // await env.load_all();
        await env.load_wm(config.env.windowManager, document);
        await env.load_desktop(config.env.desktop, document);

    }, (initBranch == "dev" ? 10 : (config.boot.fastboot ? 10 : 1000)));
}