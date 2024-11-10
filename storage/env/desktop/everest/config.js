import * as fs from "/system/api/fs.js";

export var cfg = 
{
    "desktop":
    {
        "wallpaper":
        {
            "src": "./assets/images/wallpaper.png"
        },
        "taskbar":
        {
            "height": 52,
            "border_width": 1,
            "corner_radius": 10,

            "colors":
            {
                "background": "#181825"
            },

            "tray":
            {
                "width": 300,

                "clock":
                {
                    "width": 100,
                    "show_seconds": true
                }
            }
        }
    },

    "display":
    {
        "font": 
        {
            "main": "/env/desktop/everest/assets/style/font/comfortaa.ttf",
            "mono": "/env/desktop/everest/assets/style/font/kodemono.ttf"
        }
    },

    "colors":
    {
        "accent": "#a6e3a1",
        "text": "#cdd6f4"
    }
}
export const defcfg = Object.create(cfg);

const root = `env/desktop/everest/`;
const cfgFile = root + "config.json";

export function save_cfg()
{
    let c = JSON.stringify(cfg);
    fs.writeFile(cfgFile, c);

    return 0;
}

export function load_cfg(apply=false)
{
    if (fs.exists(cfgFile))
    {
        let fc = fs.readFile(cfgFile);
        cfg = JSON.parse(fc);
    }
    else {
        save_cfg();
        return -1;
    };

    return 0;
}

export function reset_cfg()
{
    cfg = Object.create(defcfg);
    save_cfg();
    load_cfg();

    return 0;
}

export function delete_cfg(reload=false)
{
    fs.removeFile(cfgFile);
    if (reload == true)
    {
        save_cfg();
        load_cfg();
    };

    return 0;
}