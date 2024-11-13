export var launcher = HTMLDivElement.prototype||null;

export var visible = false;

export async function init()
{
    let el = document.querySelector("body > #launcher");
    if (el)
    {
        launcher = el;
        return 0;
    }
    else return -1;
}

export function show()
{
    if (launcher) launcher.className = "", visible = true;
    else return -1;
}

export function hide()
{
    if (launcher) launcher.className = "hidden", visible = false;
    else return -1;
}