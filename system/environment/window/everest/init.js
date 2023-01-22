//================================//
// Load needed modules
const fs = require("fs");

//================================//
// Initialize WM
function init() {
    //================================//
    // Read the environment config
    let env_cfg = require("../../../init");

    //================================//
    // Get the desktop environment config
    let desktop_env_cfg = require("../../desktop/everest/config.json");

    //================================//
    // Get the work area
    let working_area = desktop_env_cfg.window_manager.work_area;


}

//================================//
// Export the module
module.exports = { init };