import { fspromise } from "./rename-by-md5.js";
export async function loadjson(pathdir) {
    const imageconfigbuffer = await fspromise.readFile(pathdir);
    const config = JSON.parse(imageconfigbuffer.toString());
    return config;
}
//# sourceMappingURL=loadjson.js.map