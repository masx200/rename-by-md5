const extention = "webp";
import find from "find";
import fs from "fs";
import md5file from "md5-file";
import path from "path";
const dirpath = path.resolve("D:\\baidupandownload");
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
const fspromise = fs.promises;
// console.log([find, md5file, fspromise]);

const extreg = new RegExp("." + extention + "$");

console.log([extention, dirpath]);
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
