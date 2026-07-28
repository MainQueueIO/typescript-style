#!/usr/bin/env node
// Thin wrapper that exposes `oxlint` as an executable of
// @mainqueueio/eslint-config. It resolves the real oxlint binary from THIS
// package's own dependencies (never from PATH — that would recurse into this
// very wrapper) and defaults to the bundled shared config unless the caller
// passes their own -c/--config. This makes `oxlint` available inside any
// package that depends on @mainqueueio/eslint-config, regardless of how the
// package manager hoists transitive binaries.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const pkgPath = require.resolve('oxlint/package.json');
const { bin } = require(pkgPath);
// pathToFileURL (not `file://${pkgPath}`) so paths containing URL-significant
// characters like %, #, or ? are encoded rather than truncated/rejected.
const realBin = fileURLToPath(
  new URL(typeof bin === 'string' ? bin : bin.oxlint, pathToFileURL(pkgPath)),
);

const argv = process.argv.slice(2);
const hasConfig = argv.some(
  (a) => a === '-c' || a === '--config' || a.startsWith('--config='),
);
const configPath = fileURLToPath(
  new URL('../dist/oxlint-base.json', import.meta.url),
);
const args = hasConfig ? argv : ['-c', configPath, ...argv];

const res = spawnSync(process.execPath, [realBin, ...args], {
  stdio: 'inherit',
});
if (res.error) throw res.error;
process.exit(res.status ?? 1);
