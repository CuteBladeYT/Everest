// Styles
import * as de_styles from "./desktop/styles.js";

// Taskbar
import * as taskbar from "./taskbar/taskbar.js";

// Wallpaper
import * as de_wallpaper from "./desktop/wallpaper/wallpaper.js";

// System log
import * as syslog from "/system/syslog.js";

document.addEventListener("DOMContentLoaded", 
() => {
    let _loading = document.body.querySelector("div#_loading");
    init().then(
        (err) => {

            if (err >= 0)
                setTimeout(() => {
                    _loading.style.animationName = "_loading__hide";
                }, 1000);

        }
    );
})

export async function init()
{
    let err = 0;
    syslog.msg("Initializing Everest desktop environment");

    err += await de_styles.init();
    err += await de_wallpaper.load();
    err += await taskbar.init();

    return err;
}