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

// CHECK IF DIRECTORY
export function isDir(path="", includeRoot=true)
{
    let p = (includeRoot?r:"") + path;
    if (exists(p, false))
    {

        // 0 if directory
        // 1 if file
        return fs.lstatSync(p).isDirectory() == true ? 0 : 1;

    }
    else {
        return -1; // Path doesn't exist
    }
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



// DELETING

// Remove file
export function removeFile(filePath="", options={force:false,maxRetries:0,recursive:false,retryDelay:100}, includeRoot=true)
{
    fs.rmSync((includeRoot?r:"")+filePath, options);
}

export function removeDir(path="", options={maxRetries:0,retryDelay:100}, includeRoot=true)
{
    fs.rmdirSync((includeRoot?r:"")+path, options);
}