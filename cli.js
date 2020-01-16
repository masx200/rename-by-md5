#!/usr/bin/env node
import path from 'path';
import process from 'process';
import { loadjson, start } from './rename-by-md5.js';
function parseargs(args) {
    const 参数obj = {};
    args
        .filter(s => s.startsWith("--"))
        .map(s => /--(?<key>.+)=(?<value>.+)/g.exec(s))
        .filter(Boolean)
        .map(a => a.groups)
        .filter(Boolean)
        .forEach(v => {
        参数obj[v["key"]] = v["value"];
    });
    return 参数obj;
}
const dirarg = parseargs(process.argv)["dir"];
loadjson("./rename-config.json").then((renameconfig) => {
    let { extention, keeporigin } = renameconfig;
    let dir = path.resolve(dirarg);
    console.log("dir:", dir);
    start(extention, dir, keeporigin);
});
//# sourceMappingURL=cli.js.map