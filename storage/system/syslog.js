export var logs = {};

export function parse_log_text(logc = {text:"",err:0})
{
    let txt = "EVEREST:";

    switch (logc.err) 
    {
        case 1:
            txt += "W::";
            break;

        case 2:
            txt += "E::";
            break;
        
        default:
            txt += ":  ";
            break;
    };

    txt += " " + logc.text;
    return txt;
}

export function msg(logText="", logErr=0) 
{
    let log = {
        text: logText,
        err: logErr
    };
    let txt = parse_log_text(log);
    
    let ct = Date.now();
    let td = new Date(ct);

    txt = `${td.getHours()}:${td.getMinutes()}:${td.getSeconds()}\n${txt}`;

    switch (log.err)
    {
        case 1:
            console.warn(txt);
            break;
        
        case 2:
            console.error(txt);
            break;
        
        default:
            console.log(txt);
            break;
    };

    logs[ct] = log;
}







export function clear() {
    logs = {};
    console.clear();
}