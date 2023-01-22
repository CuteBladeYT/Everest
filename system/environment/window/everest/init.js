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
    // Get the window manager element
    let window_manager = document.querySelector("body > div#window");

    //================================//
    // Get the desktop environment config
    let desktop_env_cfg = require("../../desktop/everest/config.json");

    //================================//
    // Get the work area
    let working_area = desktop_env_cfg.window_manager.work_area;
    let working_area_y_ = working_area.top ? "top" : "bottom";
    let working_area_x_ = working_area.left ? "left" : "right";

    // And append it
    window_manager.style = `
        ${working_area_y_}: ${eval(`working_area.${working_area_y_}`)};
        ${working_area_x_}: ${eval(`working_area.${working_area_x_}`)};
        width: ${working_area.width};
        height: ${working_area.height};
    `;
}

//================================//
// Export the module
module.exports = { init };