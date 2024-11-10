import { cfg } from "../../../config.js";

export async function load()
{
    let src = cfg.desktop.wallpaper.src;
    
    document.body.querySelector("#wallpaper > img").src = src;

    return 0;
}