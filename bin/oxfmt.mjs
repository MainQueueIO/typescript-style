#!/usr/bin/env node
// Thin wrapper that exposes `oxfmt` as an executable of
// @mainqueueio/eslint-config. It resolves the real oxfmt binary from THIS
// package's own dependencies (never from PATH — that would recurse into this
// very wrapper) and defaults to the bundled shared config unless the caller
// passes their own -c/--config. This makes `oxfmt` available inside any
// package that depends on @mainqueueio/eslint-config, regardless of how the
// package manager hoists transitive binaries.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const pkgPath = require.resolve('oxfmt/package.json');
const { bin } = require(pkgPath);
const realBin = fileURLToPath(
  new URL(typeof bin === 'string' ? bin : bin.oxfmt, `file://${pkgPath}`),
);

const argv = process.argv.slice(2);
const hasConfig = argv.some(
  (a) => a === '-c' || a === '--config' || a.startsWith('--config='),
);
const configPath = fileURLToPath(
  new URL('../dist/.oxfmtrc.json', import.meta.url),
);
const args = hasConfig ? argv : ['-c', configPath, ...argv];

const res = spawnSync(process.execPath, [realBin, ...args], {
  stdio: 'inherit',
});
if (res.error) throw res.error;
process.exit(res.status ?? 1);
