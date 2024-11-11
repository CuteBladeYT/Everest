// import filesystem
import * as fs from "/system/api/fs.js";

// system config
import { cfg as config } from "/config.js";

// system log
import * as syslog from "/system/syslog.js";


// for easier access, path for env/ dir
const envPath = "env/";
const envDsktpPath = envPath + "desktop/";
const envWmPath = envPath + "wm/";

// function to load all of environment
export function load_all()
{
    load_wm().then(()=>{});
    load_desktop().then(()=>{});
}


// load desktop env
export async function load_desktop(cdsktp)
{
    if (cdsktp == null||undefined||"")
    {
        syslog.msg("No desktop environment is set", 2);
        return -1;
    };

    syslog.msg(`Loading '${cdsktp}' desktop environment`);
        
    let envFs = fs.readDir(envDsktpPath);
    if (!envFs.includes(cdsktp))
    {
        syslog.msg(`Selected desktop environment doesn't exist`, 2);
        return -2;
    };

    let initFilePath = `/env/desktop/${cdsktp}/desktop.js`;
    if (fs.exists(initFilePath))
    {
        let dsktp = await import(initFilePath);
        if (typeof(dsktp["init"]) == "function")
        {
            dsktp.init().then(
            (err) => {
                switch (err)
                {
                    case 0:
                        syslog.msg("Successfully loaded desktop environment");
                        break;
                    
                    default:
                        syslog.msg("Failed to load desktop environment", 2);
                        break;
                };
                return err;
            });
        }
        else {
            syslog.msg("Desktop environment's init file is broken", 2);
        }
    }
    else {
        syslog.msg("Desktop environment init file doesn't exist", 2);
    };

}


// load window manager
export async function load_wm(cwm)
{
    if (cwm == null||undefined||"")
    {
        syslog.msg("No window manager is set", 2);
        return -1;
    };

    syslog.msg(`Loading '${cwm}' window manager`);

    let envFs = fs.readDir(envWmPath);
    if (!envFs.includes(cwm))
    {
        syslog.msg(`Selected window manager doesn't exist`, 2);
        return -2;
    };

    let initFilePath = `/env/wm/${cwm}/wm.js`;
    if (fs.exists(initFilePath))
    {
        let wm = await import(initFilePath);
        if (typeof(wm["init"]) == "function")
        {
            wm.init().then(
            (err) => {
                switch (err)
                {
                    case 0:
                        syslog.msg("Successfully loaded window manager");
                        break;
                    
                    default:
                        syslog.msg("Failed to load window manager", 2);
                        break;
                };
                return err;
            });
        }
        else {
            syslog.msg("Window manager's init file is broken", 2);
        };
    }
    else {
        syslog.msg("Window manager init file doesn't exist", 2);
    };
}