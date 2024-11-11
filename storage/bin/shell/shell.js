import * as fs from "/system/api/fs.js";

export var cwd = "/";

export var tty = document;
tty=null;
export function _set_tty(e){tty=e}

const regex = 
{
    "number": /\d/,
    "quote": /\s(?=(?:[^()"']*(?:\([^)]+\)|["][^"]+["]|['][^']+[']))*$)/gm
};


export function set_cwd(ncwd="/")
{
    if (fs.isDir(ncwd)==0)
        cwd = ncwd.endsWith("/")?ncwd:ncwd+"/";
}


export function split_cmd(command="")
{
    let arr = [];
    
    if (command.includes("'"||'"'))
    {
        arr = command.split(regex.quote);
        for (let i = 0; i < arr.length; i++)
        {
            ["'",'"'].forEach(
                quote => {
                    let res = arr[i];
                    if (res.includes(quote))
                    {
                        res = res.replaceAll(quote, "");
                    };
                    arr[i] = res;
                }
            );
        };
    }
    else arr = command.split(" ");

    for (let i = 0; i < arr.length; i++)
    {
        let a = arr[i];

        ["'",'"'].forEach(
            quote => {
                if (a.includes(quote))
                {
                    a = a.replaceAll(quote, "");
                    arr[i] = a;
                }
            }
        );
    };

    return arr;
}

export async function parse_command(command = "", detached=false)
{
    let cmd = split_cmd(command);

    let program = cmd[0];
    
    let prog = program;
    let prog_main = "";
    let prog_path = "";

    if (!program.startsWith("/"))
    {
        if (program.startsWith("./"))
        {
            program = program.replace("./", cwd.endsWith("/")?cwd:cwd+"/");
        }
        else if (!fs.readDir(cwd).includes(program)) program = "bin/" + program, prog_path = program;
    }
    else {
        program = program.slice(1, program.length);
    };

    if (program.includes("/"))
    {
        let split = program.split("/");
        prog = split.reverse()[0];
    };
    
    if (!fs.exists(program)) {
        if (fs.exists(program+".js"))
            program = program+".js";
        else return [program + " not found",2];
    };

    let prog_isDir = fs.isDir(program);
    let dirfs = prog_isDir==0?fs.readDir(program):null;

    let progFound = false;
    [prog, "init", "main"].forEach(
        pname => {
            [pname, pname+".js"].forEach(
                pname_ => {
                    if (prog_isDir == 0)
                    {
                        if (dirfs.includes(pname_)) 
                            progFound = true,
                            prog_main = pname_
                    }
                    else if (prog_isDir == 1) 
                    {
                        progFound = true;
                        prog_main = program.split("/").reverse()[0];
                    }
                }
            )
        }
    );
    
    if (prog_isDir == 0)
    {
        prog_path = program;
        if (progFound == false) set_cwd(program);
    }
    else if (prog_isDir == 1) 
    {
        prog_path = program.split("/").slice(0, -1).join("/");
    };

    let argv = split_cmd(cmd.slice(1).join(" "));

    let p = await import("/" + prog_path + "/" + prog_main);
    
    setTimeout(
    async () => {
        if (detached == true)
        {
            p.main(argv).then(
                (res) => {
                    return res;
                }
            ).catch(
                (err) => {
                    return [err, 2];
                }
            );
        }
        else {
            try
            {
                let res = await p.main(argv);
                return res;
            } 
            catch (err) {
                let txt = err.toString();
                if (txt.match(" p.main "))
                {
                    txt = prog_main + " has no main function";
                };
                return [txt, 2];
            }
        }
    }, 100);
}

export function main(argv=[])
{   
    switch (argv[0])
    {
        case "--clear":
            if (tty)
            {
                let h = tty.body.querySelector("#shell > #history");
                for (let i = 0; i < h.childNodes.length^3; i++)
                {
                    h.firstElementChild.remove();
                };
            };
            break;
    };
    return "";
}