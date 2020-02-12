#!/usr/bin/env node
import path from "path";
import process from "process";
import { loadjson, start } from "./rename-by-md5.js";
function parseargs(args) {
    const 参数obj = {};
    args.filter(s => s.startsWith("--"))
        .map(s => /--(?<key>.+)=(?<value>.+)/g.exec(s))
        .forEach(execArray => {
        var _a, _b, _c;
        const groups = (_a = execArray) === null || _a === void 0 ? void 0 : _a.groups;
        const key = (_b = groups) === null || _b === void 0 ? void 0 : _b.key;
        const value = (_c = groups) === null || _c === void 0 ? void 0 : _c.value;
        if (key && value) {
            参数obj[key] = value;
        }
    });
    return 参数obj;
}
const dirarg = parseargs(process.argv)["dir"];
if (dirarg) {
    loadjson("./rename-config.json").then((renameconfig) => {
        let { extention, keeporigin } = renameconfig;
        let dir = path.resolve(dirarg);
        console.log("dir:", dir);
        start(extention, dir, keeporigin);
    });
}
else {
    console.log("使用md5为文件重命名");
    console.log("示例:");
    console.log(`node ./cli.js --dir=D:\\baidupandownload`);
    throw new Error("输入的参数有误!");
}
//# sourceMappingURL=cli.js.map