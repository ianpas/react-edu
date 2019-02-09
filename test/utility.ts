import { readFileSync } from "fs-extra";
import { resolve } from "path";

export function ReadJson(path: string)
{
    return JSON.parse(readFileSync(resolve(__dirname, `./common/${path}`), "utf8"));
}