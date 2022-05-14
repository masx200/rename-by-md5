import md5file from "md5-file";
export function md5FileAsPromised(filename) {
    return md5file(filename);
}
