export async function main(argv=[])
{

    let sh = await import("/bin/shell/shell.js");
    sh.main(["--clear"]);

}