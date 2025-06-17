// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { contextBridge } from "electron";
import * as fs from "fs";
import * as path from "path";

var __dirname: string = path.resolve("./os/fs/");

// FILE SYSTEM
class fs_conf 
{
    defaultEncoding: BufferEncoding = "utf-8";
    setDefaultEncoding = (encoding: BufferEncoding = "utf-8"): void =>
    {
        this.defaultEncoding = encoding;
    }
}

var fs_api = {
    "conf": new fs_conf,
    "path": path,
    "dir":
    {
        "list": (path: string): string[]                            => fs.readdirSync(path, "utf-8"),
        "rm": (path: string): void                                  => fs.rmdirSync(path),
        "mk": (path: string, rf: boolean = false): string|undefined => fs.mkdirSync(path, {recursive: rf})
    },
    "file":
    {
        "mk": (path: string): void                                                      => fs.writeFileSync(path, "", "utf-8"),
        "write": (path: string, data: string|Buffer, encoding: string = "utf-8"):void   => fs.writeFileSync(path, data, fs_api.conf.defaultEncoding)
    },
    "common":
    {
        "rm": (path: string, rf: boolean = false): void             => fs.rmSync(path, {recursive: rf}),
        "cp": (from: string, to: string, rf: boolean = true): void  => fs.cpSync(from, to, {recursive: rf})
    }
}