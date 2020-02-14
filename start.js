import fsextra from "fs-extra";
import path from "path";
import process from "process";
import { findfiles } from "./findfiles.js";
import { md5FileAsPromised } from "./md5FileAsPromised.js";
import { fspromise } from "./rename-by-md5.js";
export async function start(extention, dirpa, keeporigin) {
    const extreg = new RegExp(".(" + extention.join("|") + ")$", "i");
    const dirpath = path.resolve(dirpa);
    await fsextra.ensureDir(dirpath);
    console.log([extention, dirpath]);
    console.log("递归查找图片...", dirpath);
    findfiles(extreg, dirpath).then(files => {
        console.log(files);
        filesum = files.length;
        files.reduce(async (prom, file) => {
            await prom;
            return new Promise(s => {
                md5FileAsPromised(file).then(hash => {
                    s();
                    console.log(["获取md5成功", file, hash]);
                    const newfilename = keeporigin
                        ? file
                            .replace(new RegExp("-" + hash, "g"), "")
                            .replace(extreg, `-${hash}.${extention}`)
                        : path.resolve(path.dirname(file), `${hash}.${extention}`);
                    fspromise.rename(file, newfilename).then(() => {
                        finishcount++;
                        console.log(["rename success!", newfilename]);
                        process.title = `${(finishcount / filesum) *
                            100}% ${finishcount} / ${filesum} `;
                        console.log("处理进度" + `${finishcount} / ${filesum}`);
                    });
                });
            });
        }, Promise.resolve());
    });
}
let filesum = 0;
let finishcount = 0;
//# sourceMappingURL=start.js.map