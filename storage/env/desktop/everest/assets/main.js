// Taskbar
import * as taskbar from "./taskbar/taskbar.js";

// Wallpaper
import * as de_wallpaper from "./desktop/wallpaper/wallpaper.js";

// System log
import * as syslog from "/system/syslog.js";

document.addEventListener("DOMContentLoaded", 
() => {
    init();
})

export function init()
{
    
    de_wallpaper.load();
    taskbar.init();

}