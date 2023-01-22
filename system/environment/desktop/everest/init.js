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
    let desktop = document.querySelector("body > div#desktop");

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
            "name": "[--status_bar-width]",
            "val": env_cfg.status_bar.width
        }, 
        {
            "name": "[--wallpaper-fit]",
            "val": env_cfg.wallpaper.fit
        }
    ];
    for (const variablei in cssvarialbes) {
        let variable = cssvarialbes[variablei];
        for (let i = 0; i < (stylesheet.match(/--/g) || []).length; i++) {
            stylesheet = stylesheet.replace(variable.name, String(variable.val));
        };
    };
    if (stylesheet.match("--colors--")) {
        let var_colors_split = stylesheet.split("[--colors--");
        for (let i = 1; i < (var_colors_split.length); i++) {
            let color_vars = var_colors_split[i].split("]")[0].split("-");
            let color_var = "colors";
            for (let cvari in color_vars) {
                let cvar = color_vars[cvari];
                color_var += `.${cvar}`;
            };
            let var_color = eval(color_var);
            stylesheet = stylesheet.replace(`[--colors--${color_vars.join("-")}]`, var_color);
        };
    }
    

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
    // Initialize status bar
    let status_bar = document.createElement("div");
    status_bar.id = "everest_desktop_environment__status_bar";

    let status_bar_tray = document.createElement("div");
    status_bar_tray.id = status_bar.id + "_tray";
    status_bar_tray.className = "tray";

    let status_bar_other = document.createElement("div");
    status_bar_other.id = status_bar.id + "_others";
    status_bar_other.className = "others";

    // Initialize status bar tray
    (function() {
        // WIFI
        let wifi = document.createElement("button");
        wifi.id = status_bar_tray.id + "__wifi";
        wifi.className = "wifi";

        let wifi_icon = document.createElement("img");
        wifi_icon.id = wifi.id + "_icon";
        wifi_icon.src = `system/icons/tray/${wifi.className}.png`;

        wifi.appendChild(wifi_icon);

        // VOLUME
        let volume = document.createElement("button");
        volume.id = status_bar_tray.id + "__volume";
        volume.className = "volume";

        let volume_icon = document.createElement("img");
        volume_icon.id = wifi.id + "_icon";
        volume_icon.src = `system/icons/tray/${volume.className}.png`;

        volume.appendChild(volume_icon);

        // BATTERY
        let battery = document.createElement("button");
        battery.id = status_bar_tray.id + "__battery";
        battery.className = "battery";

        let battery_icon = document.createElement("img");
        battery_icon.id = battery.id + "_icon";
        battery_icon.src = `system/icons/tray/${battery.className}.png`;

        battery.appendChild(battery_icon);

        // Append buttons
        status_bar_tray.appendChild(wifi);
        status_bar_tray.appendChild(volume);
        status_bar_tray.appendChild(battery);
    })();

    // Initialize status bar others
    (function(){
        // NOTIFICATIONS
        let notifs = document.createElement("button");
        notifs.id = status_bar_other.id + "__notifs";
        notifs.className = "notification";

        let notifs_icon = document.createElement("img");
        notifs_icon.id = notifs.id + "_icon";
        notifs_icon.src = `system/icons/tray/${notifs.className}.png`;

        notifs.appendChild(notifs_icon);

        // Append buttons
        status_bar_other.appendChild(notifs);
    })();

    status_bar.appendChild(status_bar_tray);
    status_bar.appendChild(status_bar_other);
    desktop.appendChild(status_bar);

    //================================//
    // Initialize start menu
    let start_menu = document.createElement("div");
    start_menu.id = "everest_desktop_environment__start_menu";
    start_menu.style.display = "none";

    desktop.appendChild(start_menu);

    // Hide menu when clicked anywhere
    document.addEventListener("click", (e) => {
        start_menu.style.opacity = "0";
        setTimeout(() => {
            start_menu.style.display = "none";
        }, 100);
    });

    //================================//
    // Initialize the taskbar
    let taskbar = document.createElement("div");
    taskbar.id = "everest_desktop_environment__taskbar";

    //================================//
    // Initialize taskbar clock
    let taskbar_clock = document.createElement("div");
    taskbar_clock.id = taskbar.id + "_clock";
    taskbar_clock.textContent = String(Date.now());

    taskbar.appendChild(taskbar_clock);

    //================================//
    // Initialize taskbar buttons
    let taskbar_meta = document.createElement("button");
    taskbar_meta.id = taskbar.id + "_meta";

    // Open start menu on click
    taskbar_meta.addEventListener("click", () => {
        // Check if menu is visible
        // If true, hide it
        // Else show it
        if (start_menu.style.display == "none")
            setTimeout(() => {
                start_menu.style.display = "unset";
                setTimeout(() => {
                    start_menu.style.opacity = "1";
                }, 1);
            }, 101);
    });
    
    let taskbar_meta_icon = document.createElement("img");
    taskbar_meta_icon.src = env_cfg.taskbar.meta.icon;

    taskbar_meta.appendChild(taskbar_meta_icon);
    taskbar.appendChild(taskbar_meta);

    desktop.appendChild(taskbar);
}

//================================//
// Export the module
module.exports = { init };