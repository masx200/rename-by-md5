#!/usr/bin/env node
import path from "path";
import process from "process";
import { start } from "./start.js";
import { loadjson } from "./loadjson.js";
import { parseargs } from "./parse-args.js";
const dirarg = parseargs(process.argv.slice(2))["dir"];
const filenameurl = import.meta.url;
const jsonurl = new URL("./rename-config.json", filenameurl);
if (dirarg) {
    loadjson(jsonurl).then((renameconfig) => {
        let { extention, keeporigin } = renameconfig;
        let dir = path.resolve(dirarg);
        console.log("dir:", dir);
        start(extention, dir, keeporigin);
    });
}
else {
    console.error("使用md5为文件重命名");
    console.error(`必须参数 dir:类型 string ,指定文件夹目录`);
    console.error("示例:");
    console.error(`node ./cli.js --dir=D:\\baidupandownload`);
    console.error("输入的参数有误!");
    process.exit(1);
}
