#!/usr/bin/env node
import path from "path";
import process from "process";
import { loadjson, RENAMECONFIG, start } from "./rename-by-md5.js";
import { parseargs } from './parse-args.js';


const dirarg = parseargs(process.argv.slice(2))["dir"];
const filenameurl = import.meta.url;
const jsonurl = new URL("./rename-config.json", filenameurl);
if (dirarg) {
    loadjson(jsonurl).then((renameconfig: RENAMECONFIG) => {
        let { extention, keeporigin } = renameconfig;
        let dir = path.resolve(dirarg);
        console.log("dir:", dir);

        start(extention, dir, keeporigin);
    });
} else {
    console.log("使用md5为文件重命名");
    console.log("示例:");
    console.log(`node ./cli.js --dir=D:\\baidupandownload`);
    throw new Error("输入的参数有误!");
}
