import path from "path";
import process from "process";
import { md5FileAsPromised } from "./md5FileAsPromised.js";
import { fspromise } from "./rename-by-md5.js";
export async function handlerename(files, keeporigin, extreg, filesum) {
    let finishcount = 0;
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
