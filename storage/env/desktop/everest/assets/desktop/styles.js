import { cfg } from "../../config.js";

export async function init()
{
    let s = document.createElement("style");
    s.innerText = "";

    s.innerText += `@font-face{font-family:main;src:url(${cfg.display.font.main});}\n`;
    s.innerText += `@font-face{font-family:mono;src:url(${cfg.display.font.mono});}\n`;

    s.innerText += "\n:root{\n";

    let vars = 
    [
        "color-text"
    ];

    let vals = [
        cfg.colors.text
    ];

    for (let i = 0; i < vars.length; i++)
    {
        let v0 = vars[i];
        let v1 = vals[i];

        let line = `--desktop-${v0}: ${v1};\n`;
        s.innerText += line;
    };

    s.innerText += "\n}";

    document.head.appendChild(s);

    return 0;
}