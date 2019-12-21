import find from "find";
import fs from "fs";
import fsextra from "fs-extra";
import md5file from "md5-file";
import path from "path";
const fspromise = fs.promises;
async function loadjson(pathdir: string) {
  const imageconfigbuffer = await fspromise.readFile(path.resolve(pathdir));
  const config = JSON.parse(imageconfigbuffer.toString());
  return config;
}
"use strict";
process.on("unhandledRejection", err => {
  throw err;
});

function md5FileAsPromised(filename: string): Promise<string> {
  return new Promise(function(resolve, reject) {
    md5file(filename, function(err, hash) {
      if (err) {
        return reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function findfiles(pattern: string | RegExp, root: string): Promise<string[]> {
  return new Promise((s, j) => {
    find
      .file(pattern, root, files => {
        s(files);
      })
      .error(e => {
        j(e);
      });
  });
}
// const extention = "webp";
// const dirpa = "D:\\baidupandownload";
// import renameconfig from "./rename-config.js";
async function start(extention: string, dirpa: string) {
  const extreg = new RegExp("." + extention + "$");
  const dirpath = path.resolve(dirpa);
  await fsextra.ensureDir(dirpath);
  console.log([extention, dirpath]);
  findfiles(extreg, dirpath).then(files => {
    console.log(files);
    files.forEach(file => {
      md5FileAsPromised(file).then(hash => {
        console.log([file, hash]);
        const newfilename = file
          .replace(new RegExp("-" + hash, "g"), "")
          .replace(extreg, `-${hash}.${extention}`);
        fspromise.rename(file, newfilename).then(() => {
          console.log(["rename success", newfilename]);
        });
      });
    });
  });
}
interface RENAMECONFIG {
  extention: string;
  dir: string;
}
loadjson("./rename-config.json").then((renameconfig: RENAMECONFIG) => {
  console.log(renameconfig);
  start(renameconfig.extention, renameconfig.dir);
});
