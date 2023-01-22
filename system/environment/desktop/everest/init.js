//================================//
// Load needed modules
const fs = require("fs");

//================================//
// Do the things on function call
function init() {
    //================================//
    // Get the desktop environment config
    let env_cfg = require("./config.json");
    let colors = require("./colors.json");

    //================================//
    // Get the desktop element
    let desktop = document.querySelector("div#desktop");

    //================================//
    // Initialize CSS
    let desktop_env_css = document.createElement("style");

    // Get the stylesheet content
    let stylesheet = fs.readFileSync("system/environment/desktop/everest/de.css", "utf-8");

    // Replace variables
    let cssvarialbes = [
        {
            "name": "[--taskbar-height]",
            "val": env_cfg.taskbar.appearance.height
        }, 
        {
            "name": "[--wallpaper-fit]",
            "val": env_cfg.wallpaper.fit
        }, 
        {
            "name": "[--colors--taskbar]",
            "val": colors.taskbar
        }
    ];
    for (const variablei in cssvarialbes) {
        let variable = cssvarialbes[variablei];
        for (let i = 0; i < (stylesheet.match(/--/g) || []).length; i++) {
            stylesheet = stylesheet.replace(variable.name, String(variable.val));
        };
    };

    // Set the stylesheet content and append it to document
    desktop_env_css.textContent = stylesheet;
    document.head.appendChild(desktop_env_css);

    //================================//
    // Initialize wallpaper
    // let wallpaper = document.createElement("img");
    let wallpaper = document.createElement(env_cfg.wallpaper.type);
    wallpaper.id = "everest_desktop_environment__wallpaper";
    wallpaper.src = env_cfg.wallpaper.source;
    if (env_cfg.wallpaper.type == "video") {
        wallpaper.autoplay = true,
        wallpaper.play();
    };

    desktop.appendChild(wallpaper);

    //================================//
    // Initialize the taskbar
    let taskbar = document.createElement("div");
    taskbar.id = "everest_desktop_environment__taskbar";

    //================================//
    // Initialize taskbar buttons
    let taskbar_meta = document.createElement("button");
    taskbar_meta.id = "everest_desktop_environment__taskbar_meta";
    
    let taskbar_meta_icon = document.createElement("img");
    taskbar_meta_icon.src = env_cfg.taskbar.meta.icon;

    taskbar_meta.appendChild(taskbar_meta_icon);
    taskbar.appendChild(taskbar_meta);

    desktop.appendChild(taskbar);
}

//================================//
// Export the module
module.exports = { init };