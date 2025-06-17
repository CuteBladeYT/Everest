"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
var __dirname = path.resolve("./os/fs/");
// FILE SYSTEM
class fs_conf {
    constructor() {
        this.defaultEncoding = "utf-8";
        this.setDefaultEncoding = (encoding = "utf-8") => {
            this.defaultEncoding = encoding;
        };
    }
}
var fs_api = {
    "conf": new fs_conf,
    "path": path,
    "dir": {
        "list": (path) => fs.readdirSync(path, "utf-8"),
        "rm": (path) => fs.rmdirSync(path),
        "mk": (path, rf = false) => fs.mkdirSync(path, { recursive: rf })
    },
    "file": {
        "mk": (path) => fs.writeFileSync(path, "", "utf-8"),
        "write": (path, data, encoding = "utf-8") => fs.writeFileSync(path, data, fs_api.conf.defaultEncoding)
    },
    "common": {
        "rm": (path, rf = false) => fs.rmSync(path, { recursive: rf }),
        "cp": (from, to, rf = true) => fs.cpSync(from, to, { recursive: rf })
    }
};
