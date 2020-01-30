#!/usr/bin/env node
import path from 'path';
import process from 'process';

import { loadjson, RENAMECONFIG, start } from './rename-by-md5.js';

function parseargs(args: string[]): Record<string, string> {
  const 参数obj: Record<string, string> = {};
  args
    .filter(s => s.startsWith("--"))
    .map(s => /--(?<key>.+)=(?<value>.+)/g.exec(s))
    .filter(Boolean)
    .map(a => a!.groups)
    .filter(Boolean)
    .forEach(v => {
      参数obj[v!["key"]] = v!["value"];
    });
  return 参数obj;
  
}
const dirarg = parseargs(process.argv)["dir"];
if (dirarg) {
  loadjson("./rename-config.json").then((renameconfig: RENAMECONFIG) => {
    //   console.log(renameconfig);
    let { extention, /* dir, */ keeporigin } = renameconfig;
    let dir = path.resolve(dirarg); //dirarg
    console.log("dir:", dir);

    start(extention, dir, keeporigin);
  });
} else {
  console.log("示例:");
  console.log(`node ./cli.js --dir=D:\\baidupandownload`);
  throw new Error("输入的参数有误!");
}
