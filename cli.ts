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
  // .reduce((a, v) => {
  //   return {
  //     ...a,
  //     ...{ [v["key"]]: v["value"] }
  //   };
  // }, {});
  //   } catch (error) {
  //     console.log(process.argv);
  //     console.error("\n输入的参数有误!\n");
  //     console.error(error);
  //     throw Error("输入的参数有误!");
  //   }
}
const dirarg = parseargs(process.argv)["dir"];
loadjson("./rename-config.json").then((renameconfig: RENAMECONFIG) => {
  //   console.log(renameconfig);
  let { extention, /* dir, */ keeporigin } = renameconfig;
  let dir = path.resolve(dirarg); //dirarg
  console.log("dir:", dir);

  start(extention, dir, keeporigin);
});
