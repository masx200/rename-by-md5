"use strict";
process.on("unhandledRejection", err => {
    throw err;
});
import find from "find";
import fs from "fs";
import md5file from "md5-file";
import path from "path";
function md5FileAsPromised(filename) {
    return new Promise(function (resolve, reject) {
        md5file(filename, function (err, hash) {
            if (err) {
                return reject(err);
            }
            else {
                resolve(hash);
            }
        });
    });
}
const fspromise = fs.promises;
function findfiles(pattern, root) {
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
import renameconfig from "./rename-config.js";
function start(extention, dirpa) {
    const extreg = new RegExp("." + extention + "$");
    const dirpath = path.resolve(dirpa);
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
start(renameconfig.extention, renameconfig.dir);
