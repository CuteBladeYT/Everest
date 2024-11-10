export function now()
{
    return Date.now();
}

export function get_current_time(parse=false)
{
    let ct = new Date(now());
    
    let dict = 
    {
        day: parse ? ct.getDate().toString().padStart(2, "0") : ct.getDate(),
        month: parse ? ct.getMonth().toString().padStart(2, "0") : ct.getMonth(),
        year: ct.getFullYear(),

        hour: parse ? ct.getHours().toString().padStart(2, "0") : ct.getHours(),
        minute: parse ? ct.getMinutes().toString().padStart(2, "0") : ct.getMinutes(),
        second: parse ? ct.getSeconds().toString().padStart(2, "0") : ct.getSeconds()
    };

    return dict;
}