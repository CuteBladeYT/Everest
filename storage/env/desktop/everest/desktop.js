// Import FileSystem from Everest system's API
import * as fs from "/system/api/fs.js";

// Import DOM
import * as dom from "/system/api/dom.js";

// Desktop Environment's metadata
export const metadata = 
{
    "name": "Everest",
    "pkg": "everest",
    "version": "0.1.1",
    "author": "AMP Studio",
};

// Important constants
const root = `env/desktop/${metadata.pkg}/`; // Desktop Environment's root directory

const filePaths = // Paths to env files
{
    "html": root + "desktop.html"
};

// Init function
// this will be called when bootloader loads
// all the environments and WMs
export async function init()
{
    // Read the contents of 'desktop.html'

    

    if (fs.exists(filePaths.html))
    {
        // Read the file's contents
        let desktopElement = fs.readFile(filePaths.html);
        
        // And append it to a DOM
        dom.get_element(dom.env_desktop).innerHTML = desktopElement.trim();
    }
    else {
        // If the file doesn't exist, return an error code
        return -1;
    };

    return 0;
}