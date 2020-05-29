import fs from "fs";
import process from "process";
import { start } from "./start.js";

export const fspromise = fs.promises;
"use strict";
process.on("unhandledRejection", (err) => {
    throw err;
});
export { start };
