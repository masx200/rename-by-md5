import fsextra from "fs-extra";
import path from "path";
import { findfiles } from "./findfiles.js";
import { handlerename } from "./handlerename.js";
export async function start(extention, dirpa, keeporigin = false) {
    const extreg = new RegExp(".(" + extention.join("|") + ")$", "i");
    const dirpath = path.resolve(dirpa);
    await fsextra.ensureDir(dirpath);
    console.log([extention, dirpath]);
    console.log("递归查找图片...", dirpath);
    const files = await findfiles(extreg, dirpath);
    console.log(files);
    let filesum = files.length;
    await handlerename(files, keeporigin, extreg, filesum);
}
