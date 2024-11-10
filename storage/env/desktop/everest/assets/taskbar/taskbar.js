// Import config
import { cfg } from "../../config.js";

export function init()
{
    let tb = document.body.querySelector("#taskbar");
    let conf = cfg.desktop.taskbar;
    let cols = cfg.colors;

    let tbstyle = document.createElement("style");
    tbstyle.innerText = ":root{\n";

    let vars = [
        "height", 
        "border_width",
        "corner_radius",
        "tray_width",

        "color_background",
        "color_border"
    ];
    let vals = [
        conf.height + "px",
        conf.border_width + "px",
        conf.corner_radius + "px",
        conf.tray.width + "px",

        conf.colors.background,
        cols.accent
    ];

    for (let i = 0; i < vars.length; i++)
    {
        let vr = vars[i];
        let vl = vals[i];

        let prop = `--taskbar-${vr}: ${vl};\n\n`;
        tbstyle.innerText += prop;
    };
    tbstyle.innerText += "}";

    document.head.appendChild(tbstyle);
}