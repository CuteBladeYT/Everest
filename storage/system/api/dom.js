// DOM elements of index

export const tty = "#everest_tty";
export const env = "#env";
export const env_desktop = `${env} > #desktop`;
export const env_windowManager = `${env} > #windowmanager`;

export function get_element(element="")
{
    let e = document.body.querySelector(element);
    return e;
}