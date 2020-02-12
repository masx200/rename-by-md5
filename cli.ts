#!/usr/bin/env node
import path from "path";
import process from "process";

import { loadjson, RENAMECONFIG, start } from "./rename-by-md5.js";

function parseargs(args: string[]): Record<string, string> {
    const 参数obj: Record<string, string> = {};
    args.filter(s => s.startsWith("--"))
        .map(s => /--(?<key>.+)=(?<value>.+)/g.exec(s))
        .filter(Boolean)
        .map(a => a!.groups)
        .filter(Boolean)
        .forEach((v:Record<string, string>) => {
        	
            参数obj[v!["key"]] = v!["value"];
        });
    return 参数obj;
}
const dirarg = parseargs(process.argv)["dir"];
if (dirarg) {
    loadjson("./rename-config.json").then((renameconfig: RENAMECONFIG) => {
        
        let { extention,  keeporigin } = renameconfig;
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
