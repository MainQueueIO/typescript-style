// scripts/bump-version.ts
import { readFileSync, writeFileSync } from "fs";

const args = Bun.argv;

const versionFlag = args.find(arg => arg.startsWith("--version="));
const tagArg = args.find(arg => arg.startsWith("--tag="));
const suffixArg = args.find(arg => arg.startsWith("--suffix="));

if (!versionFlag) {
  console.error("Missing --version argument");
  process.exit(1);
}

if (!tagArg) {
  console.error("Missing --tag argument");
  process.exit(1);
}

if (!suffixArg) {
  console.error("Missing --suffix argument");
  process.exit(1);
}

const inputVersion = versionFlag.split("=")[1];
if (!inputVersion) {
  console.error("Invalid version argument");
  process.exit(1);
}

const tag = tagArg.split("=")[1];
if (!tag) {
  console.error("Invalid tag argument");
  process.exit(1);
}

const suffix = suffixArg.split("=")[1];
if (!suffix) {
  console.error("Invalid suffix argument");
  process.exit(1);
}

// Example logic: add `-ci` suffix if not present
const versionWithoutBase = inputVersion.split(tag)[0]
if (!versionWithoutBase) {
  console.error("Unable to split version by tag");
  process.exit(1);
}

const modifiedVersion = `${versionWithoutBase}${tag}.${suffix}`;

// Update package.json
const pkgPath = new URL("../../package.json", import.meta.url).pathname;
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
pkg.version = modifiedVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// Output the modified version
console.log(modifiedVersion);