#!/usr/bin/env node
import path from "path";
import process from "process";
import { start } from "./start.js";
import { loadjson } from "./loadjson.js";
import { parseargs } from "./parse-args.js";
const cliargs = parseargs(process.argv.slice(2));
const dirarg = cliargs["dir"];
const extentionarg = cliargs["extention"];
const filenameurl = import.meta.url;
const jsonurl = new URL("./rename-config.json", filenameurl);
if (dirarg) {
    console.log(cliargs);
    loadjson(jsonurl).then((renameconfig) => {
        let { extention, keeporigin } = renameconfig;
        let dir = path.resolve(dirarg);
        console.log("dir:", dir);
        if (extentionarg) {
            extention = [extentionarg];
        }
        start(extention, dir, keeporigin);
    });
} else {
    console.error("使用md5为文件重命名");
    console.error(`必须参数 dir:类型 string ,指定文件夹目录
可选参数 extention:类型 string ,指定文件扩展名`);
    console.error("示例:");
    console.error(`node ./cli.js --dir=D:\\baidupandownload`);
    console.error(
        `npx @masx200/rename-by-md5 --dir=D:\\baidupandownload --extention=jpg`
    );
    console.error("输入的参数有误!");
    process.exit(1);
}
