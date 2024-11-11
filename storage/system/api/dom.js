// DOM elements of index

export const tty = "#everest_tty";
export const env = "#env";
export const env_desktop = `${env} > #desktop`;
export const env_windowManager = `${env} > #windowmanager`;

var domroot = window.everest.root;

export function _set_domroot(e){domroot=e}

export function get_element(element="")
{
    console.log(domroot);
    
    if (domroot)
    {
        let e = domroot.body.querySelector(element);
        return e;
    };
    return -1;
}