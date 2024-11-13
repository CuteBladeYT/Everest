import { cfg } from "../../config.js";

export async function init()
{
    let s = document.createElement("style");
    s.innerText = "";

    s.innerText += `@font-face{font-family:main;src:url(${cfg.display.font.main});}\n`;
    s.innerText += `@font-face{font-family:mono;src:url(${cfg.display.font.mono});}\n`;

    document.head.appendChild(s);

    return 0;
}