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
    const files = await findfiles(extreg, dirpath);
    console.log(files);
    filesum = files.length;
    await handlerename(files, keeporigin, extreg);
}
let filesum = 0;
let finishcount = 0;
async function handlerename(files, keeporigin, extreg) {
    for (let file of files) {
        const hash = await md5FileAsPromised(file);
        const 文件扩展名 = path.extname(file);
        console.log(["获取md5成功", file, hash]);
        const newfilename = keeporigin
            ? file
                  .replace(new RegExp("-" + hash, "g"), "")
                  .replace(extreg, `-${hash}${文件扩展名}`)
            : path.resolve(path.dirname(file), `${hash}${文件扩展名}`);
        await fspromise.rename(file, newfilename);
        finishcount++;
        console.log(["rename success!", newfilename]);
        let 进度 =
            "处理进度" +
            `${(finishcount / filesum) * 100}% ${finishcount} / ${filesum} `;
        process.title = 进度;
        console.log(进度);
    }
}
