import fsextra from "fs-extra";
import path from "path";
import { findfiles } from "./findfiles.js";
import { handlerename } from "./handlerename";
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
    //return

    const files = await findfiles(extreg, dirpath);

    //.then((files) => {
    console.log(files);
    let filesum = files.length;
    /* Error: EMFILE: too many open files,  */

    await handlerename(files, keeporigin, extreg, filesum);
}
