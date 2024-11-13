// Keybind handler
import * as de_keybindHandler from "./keybind_handler.js";

// Styles
import * as de_styles from "./desktop/styles.js";

// Taskbar
import * as taskbar from "./taskbar/taskbar.js";

// Wallpaper
import * as de_wallpaper from "./desktop/wallpaper/wallpaper.js";

// System log
import * as syslog from "/system/syslog.js";

// Launcher
import * as launcher from "./launcher/main.js";

// Config
import * as dcfg from "../config.js";

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

    err += de_keybindHandler.init();
    err += await de_styles.init();
    err += await de_wallpaper.load();
    err += await taskbar.init();
    err += await launcher.init();

    // load variables
    let cfg_load_err = dcfg.load_cfg();
    if (cfg_load_err < 0) err += cfg_load_err, dcfg.load_cfg();
    else {
        let conf = dcfg.cfg;

        // elements
        let c = {
            "taskbar": 
            {
                "height": conf.desktop.taskbar.height + "px",
                "margin": conf.desktop.taskbar.margin + "px",
                "border-width": conf.desktop.taskbar.border_width + "px",
                "corner-radius": conf.desktop.taskbar.corner_radius + "px",
                "tray-width": conf.desktop.taskbar.tray.width + "px",
                "tray-clock-width": conf.desktop.taskbar.tray.clock.width + "px",

                "color-background": conf.desktop.taskbar.colors.background,
                "color-border": conf.colors.accent
            },
            "desktop":
            {
                "color-text": conf.colors.text
            },
            "colors":
            {
                "accent": conf.colors.accent,
                "text": conf.colors.text,
                "text-hover": conf.colors.text_hover,
                "panel-bg": conf.colors.panel.bg,
                "panel-bg-dark": conf.colors.panel.bg_dark,
                "panel-bg-darker": conf.colors.panel.bg_darker,
                "info-warning": conf.colors.info.warning,
                "info-error": conf.colors.info.error,
            }
        };

        // <style>
        let s = document.createElement("style");
        s.innerText = ":root{";

        Object.keys(c).forEach(
            el => {

                Object.keys(c[el]).forEach(
                    key => {
                        let val = c[el][key];
                        s.innerText += `--${el}-${key}:${val};`;
                    }
                )

            }
        );

        s.innerText += "}";
        document.head.appendChild(s);
    }

    return err;
}