import md5file from "md5-file";
export function md5FileAsPromised(filename: string): Promise<string> {
    return new Promise(function (resolve, reject) {
        md5file(filename, function (err, hash) {
            if (err) {
                return reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}
