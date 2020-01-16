export declare function loadjson(pathdir: string): Promise<any>;
export declare function start(extention: string, dirpa: string, keeporigin: boolean): Promise<void>;
export interface RENAMECONFIG {
    extention: string;
    dir: string;
    keeporigin: boolean;
}
