//================================//
// Declare all required Node modules
// required for init
const fs = require("fs");
const system_info = require("systeminformation");

//================================//
// Do the stuff on load
document.addEventListener("DOMContentLoaded", async () => {
    //================================//
    // Load desktop environment and window manager
    let init_cfg = require("./system/settings/init.json");

    //================================//
    // Get the data about DE/WM
    let cfg = {
        "desktop_env": init_cfg.startup.environment.desktop,
        "window_manager": init_cfg.startup.environment.window
    };

    //================================//
    // Load DE and WM
    let desktop_env = require(`./system/environment/desktop/${cfg.desktop_env}/init`);
    let window_manager = require(`./system/environment/window/${cfg.window_manager}/init`);
    // let desktop_env = require(`./environment/desktop/everest/init.js`);
    // let window_manager = require(`./environment/window/everest/init.js`);

    desktop_env.init();
    window_manager.init();
});