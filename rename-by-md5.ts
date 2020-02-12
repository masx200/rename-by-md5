import find from "find";
import fs from "fs";
import fsextra from "fs-extra";
import md5file from "md5-file";
import path from "path";
import process from "process";

const fspromise = fs.promises;
export async function loadjson(pathdir: string | URL) {
    const imageconfigbuffer = await fspromise.readFile(pathdir);
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
        find.file(pattern, root, files => {
            s(files);
        }).error(e => {
            j(e);
        });
    });
}

let filesum = 0;
let finishcount = 0;
export async function start(
    extention: string[],
    dirpa: string,
    keeporigin: boolean
) {
    const extreg = new RegExp(".(" + extention.join("|") + ")$", "i");

    const dirpath = path.resolve(dirpa);
    await fsextra.ensureDir(dirpath);
    console.log([extention, dirpath]);
    console.log("递归查找图片...", dirpath);
    findfiles(extreg, dirpath).then(files => {
        console.log(files);
        filesum = files.length;
        /* Error: EMFILE: too many open files,  */
        files.reduce(async (prom: Promise<any>, file) => {
            await prom;
            return new Promise(s => {
                md5FileAsPromised(file).then(hash => {
                    s();
                    console.log([file, hash]);

                    const newfilename = keeporigin
                        ? file
                              .replace(new RegExp("-" + hash, "g"), "")
                              .replace(extreg, `-${hash}.${extention}`)
                        : path.resolve(
                              path.dirname(file),
                              `${hash}.${extention}`
                          );

                    fspromise.rename(file, newfilename).then(() => {
                        finishcount++;
                        console.log(["rename success", newfilename]);
                        process.title = `${(finishcount / filesum) *
                            100}% ${finishcount} / ${filesum} `;
                    });
                });
            });
        }, Promise.resolve());
    });
}
export interface RENAMECONFIG {
    extention: string[];
    dir: string;
    keeporigin: boolean;
}
