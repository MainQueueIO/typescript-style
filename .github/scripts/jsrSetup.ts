
import { readFileSync, writeFileSync } from "fs";

const args = Bun.argv;

const versionFlag = args.find(arg => arg.startsWith("--version="));

let version: string | null = null;
if (versionFlag && versionFlag.split("=") && versionFlag.split("=").length > 1) {
  version = versionFlag.split("=")[1];
}

if (!version) {
  const pkgPath = new URL("../../package.json", import.meta.url).pathname;
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  version = pkg.version;
}


const jsrPath = new URL("../../jsr.json", import.meta.url).pathname;
const jsr = JSON.parse(readFileSync(jsrPath, "utf-8"));
jsr.version = version;

writeFileSync(jsrPath, JSON.stringify(jsr, null, 2) + "\n");

console.log(version);