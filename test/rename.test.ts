import { test } from "vitest";
import assert from "assert";
import fsextra from "fs-extra";
import { start } from "../lib/start.js";
import { fileURLToPath } from "url";
test("rename", async () => {
    const name = Math.random().toString();
    const testfile = fileURLToPath(
        new URL(`./temp/${name}.txt`, import.meta.url)
    );
    const dirpa = fileURLToPath(new URL("./temp/", import.meta.url));
    try {
        await fsextra.ensureFile(testfile.toString());
        await fsextra.writeFile(testfile.toString(), "helloworld");
        await start(["txt"], dirpa.toString());

        assert(
            fsextra.existsSync(dirpa + "fc5e038d38a57032085441e7fe7010b0.txt")
        );
        assert(!fsextra.existsSync(testfile));
    } catch (error) {
        throw error;
    } finally {
        await fsextra.remove(dirpa);
    }
});
