export function parseargs(args: string[]): Record<string, string> {
    const 参数obj: Record<string, string> = {};
    args.filter(s => s.startsWith("--"))
        .map(s => /--(?<key>.+)=(?<value>.+)/g.exec(s))
        .forEach(execArray => {
            const groups = execArray?.groups;
            const key = groups?.key;
            const value = groups?.value;
            if (key && value) {
                参数obj[key] = value;
            }
        });

    return 参数obj;
}
