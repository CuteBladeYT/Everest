// Declare default configurations
export var cfg = 
{
    "env": 
    {
        "desktop": "everest",
        "windowManager": "winbox"
    },
    "boot": 
    {
        "fastboot": false
    }
};
const def_cfg = Object.create(cfg);

// Import modules
import * as fs from "/system/api/fs.js";
import * as syslog from "/system/syslog.js";

export function read_confs() 
{
    syslog.msg("Reading config files");

    let _fs = fs.readDir("cfg", "utf-8");
    let files = [];

    for (let i = 0; i < _fs.length; i++) 
    {
        let file = _fs[i];
        if (file.endsWith(".json")) 
        {
            files.push(file);
        };
    };

    for (let i = 0; i < files.length; i++) 
    {
        let file = files[i];
        let fc = fs.readFile("cfg/" + file);
        let cf = JSON.parse(fc);
        cfg[file.split(".")[0]] = cf;
    };
}


export function check_confs()
{
    let _fs = fs.readDir("cfg", "utf-8");
    let confs = Object.keys(cfg);
    let files = [];
    let errs = [];

    for (let i = 0; i < _fs.length; i++) 
    {
        let file = _fs[i];
        if (file.endsWith(".json")) 
        {
            files.push(file);
        };
    };

    for (let i = 0; i < confs.length; i++) 
    {
        let err = false;
        let file = confs[i] + ".json";

        if (_fs.includes(file))
        {
            let fc = fs.readFile("cfg/" + file);
            
            if (fc == null||undefined)
                err = true;
        }
        else {
            err = true;
        };
        
        if (err)
            errs.push(file);
    };
    

    if (errs.length > 0)
    {
        reset_confs(errs);
    };
}


export function reset_confs(configFiles=[]) 
{
    if (configFiles.length == 0)
    {
        configFiles = Object.keys(cfg);
    };

    for (let i = 0; i < configFiles.length; i++) 
    {
        let conf = configFiles[i];
        conf = conf.endsWith(".json") ? conf.split(".")[0] : conf;
        let cf = cfg[conf];

        let confPath = "cfg/" + conf + ".json";

        fs.writeFile(confPath, JSON.stringify(cf));
    };
}