import find from "find";
export function findfiles(pattern, root) {
    return new Promise((s, j) => {
        find.file(pattern, root, files => {
            s(files);
        }).error(e => {
            j(e);
        });
    });
}
//# sourceMappingURL=findfiles.js.map