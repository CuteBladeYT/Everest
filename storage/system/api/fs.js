// Node.js FileSystem module
const fs = require("fs");

// Root path
const r = "storage/";

// READING

// DIRECTORY LIST
export function readDir(directory="") 
{
    let files = fs.readdirSync(r + directory);
    return files;
}

// FILE CONTENTS
export function readFile(filePath="", encoding="utf-8", includeRoot=true) 
{
    let fc = fs.readFileSync(
        (includeRoot?r:"") + filePath, 
        {
            encoding: encoding||"utf-8"
        }
    );
    return fc;
}

// CHECK IF PATH EXISTS
export function exists(path="", includeRoot=true)
{
    return fs.existsSync((includeRoot?r:"") + path);
}


// STORING

// FILE CONTENTS
export function writeFile(filePath="", fileContent="", encoding="utf-8", check=false, includeRoot=true)
{
    let err = 0;

    fs.writeFileSync(
        (includeRoot?r:"") + filePath, 
        fileContent, 
        {
            encoding: encoding||"utf-8"
        }
    );

    if (check == true) 
    {
        let fsplit = filePath.split("/");
        if (!fsplit.reverse()[0] in readDir((includeRoot?r:"")+fsplit[0])) 
        {
            err = 404;
        };
    };

    return err;
}