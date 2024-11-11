export async function main(argv=[])
{

    let env = await import("/env/env.js");

    let name = argv[1];

    switch (argv[0])
    {
        case "wm":
            return await env.load_wm(name);
            break;
        
        case "dsktp":
            return await env.load_desktop(name);
            break;
    };
        
    return ["Wrong data",2];
}