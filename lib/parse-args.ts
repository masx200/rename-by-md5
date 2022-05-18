import parse from "@masx200/mini-cli-args-parser";

export function parseargs(args: string[]): Record<string, string> {
    return parse(args);
}
