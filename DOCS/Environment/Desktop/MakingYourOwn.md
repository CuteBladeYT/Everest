# Making your own Desktop Environment for Everest
#### by UnitedCatdom @ AMP Studio

<br><br>

---

### Table of contents
- [Getting started](#getting-started) - Take your first step into creating a desktop environment


### Getting started
To make a desktop environment you have to create a new directory in `storage/env/desktop/` and use a *package name* as the folder's name. (should be all lowercase and without any spaces and special signs).
<br><br>
So the current working directory is `storage/env/desktop/{name}/`
<br>
Good. First create some files, the tree should look like this:<br>

```
desktop_env_name/
| - desktop.js
| - desktop.html
```

<br><br>
Contents of the **`desktop.js`** should look at this at first.
<br>
All of the core modules should be imported.

```js
// Import FileSystem from Everest system's API
import * as fs from "/system/api/fs.js";

// Import DOM
import * as dom from "/system/api/dom.js";

// Desktop Environment's metadata
export const metadata = 
{
    "name": "<An actual, display name>",
    "pkg": "<Package name (must be the same as folder's name)>",
    "version": "0.1.1",
    "author": "<Your name>",
};

// Important constants
const root = `/system/env/desktop/${metadata.pkg}/`; // Desktop Environment's root directory

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
    if (!fs.exists(filePaths.html))
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
```

And then in **`desktop.html`** file build the interface of desktop environment as you like, there's no limitations.