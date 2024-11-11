import * as shell from "../shell.js";
import * as syslog from "/system/syslog.js";

// elements
var history;
var _element_input_cmd;
var _element_input_cwd;

var __cwd_update_interval;

export var _domloaded = false;
document.addEventListener("DOMContentLoaded", init);

export function init()
{
    if (_domloaded == true) return;

    history = document.body.querySelector("#shell > #history");

    _element_input_cwd = document.body.querySelector("#shell > #input > #cwd");
    _element_input_cmd = document.body.querySelector("#shell > #input > #commandIn");
    _element_input_cmd.disabled = false;

    __cwd_update_interval = setInterval(
        ()=>{
            _element_input_cwd.textContent = shell.cwd;
        },
        100
    );

    // document.createElement("input").addEventListener("change")
    _element_input_cmd.addEventListener("change", 
        () => {
            let cmd = _element_input_cmd.value;
            _element_input_cmd.value = "";
            _element_input_cmd.disabled = true;

            log(cmd);

            shell._set_tty(document);
            shell.parse_command(cmd).then(
                res => {
                    let txt = res;
                    let err = 0;
                    if (typeof(res) == typeof([]))
                        txt = res[0],
                        err = res[1];

                    log(txt, err);
                    _element_input_cmd.disabled = false;
                    _element_input_cmd.focus();
                }
            )

        }
    );



    _domloaded = true;
}

export function log(text="", err=0)
{
    let cl = "";

    switch (err)
    {
        case 1:
            cl = "warning";
            break;
        
        case 2:
            cl = "error";
            break;
    };

    let span = document.createElement("span");
    span.textContent = String(text);
    span.className = cl;
    history.appendChild(span);
}