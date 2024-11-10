// Import modules

// for core api from electron
const { ipcRenderer } = require("electron");

// modules
import * as cfg from "/config.js";
import { cfg as config } from "/config.js";
import * as syslog from "/system/syslog.js";
import * as env from "/env/env.js";

ipcRenderer.on("everest_init", 
(_0, vars) => {
    window.everest = vars;

    init_();
});

function init_() 
{
    var initBranch = window.everest.branch;

    setTimeout(
    async () => {

        syslog.clear();
        syslog.msg("System init started");

        cfg.check_confs();
        cfg.read_confs();

        await env.load_all();

    }, (initBranch == "dev" ? 0 : 1000));
}