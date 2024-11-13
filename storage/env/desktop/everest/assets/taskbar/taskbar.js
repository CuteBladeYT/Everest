// Import config
import { cfg } from "../../config.js";

// Import time
import * as Time from "/system/api/time.js";

// Launcher
import * as launcher from "../launcher/main.js";

var tb = document.createElement("div");

export async function init()
{
    tb.remove();
    tb = document.body.querySelector("#taskbar");

    tb.querySelector("button#launcher").addEventListener(
        "click",
        () => {
            launcher.show();
        }
    );
    // let conf = cfg.desktop.taskbar;
    // let cols = cfg.colors;

    // let tbstyle = document.createElement("style");
    // tbstyle.innerText = ":root{\n";

    // let vars = [
    //     "height", 
    //     "border-width",
    //     "corner-radius",
    //     "tray-width",
    //     "tray-clock-width",

    //     "color-background",
    //     "color-border"
    // ];
    // let vals = [
    //     conf.height + "px",
    //     conf.border_width + "px",
    //     conf.corner_radius + "px",
    //     conf.tray.width + "px",
    //     conf.tray.clock.width + "px",

    //     conf.colors.background,
    //     cols.accent
    // ];

    // for (let i = 0; i < vars.length; i++)
    // {
    //     let vr = vars[i];
    //     let vl = vals[i];

    //     let prop = `--taskbar-${vr}: ${vl};\n\n`;
    //     tbstyle.innerText += prop;
    // };
    // tbstyle.innerText += "}";

    // document.head.appendChild(tbstyle);

    clock_fn();

    return 0;
}

var _tb_clock_interval;
function clock_fn()
{
    clearInterval(_tb_clock_interval);
    let clock = tb.querySelector("#tray > #clock");
    let c_time = clock.firstElementChild;
    let c_date = clock.lastElementChild;

    _tb_clock_interval = setInterval(
    () => {
        
        let t = Time.get_current_time(true);

        c_time.textContent = `${t.hour}:${t.minute}${ cfg.desktop.taskbar.tray.clock.show_seconds ? `:${t.second}` : ""}`;
        c_date.textContent = `${t.day}.${t.month}.${t.year}`;

    }, 999);
}