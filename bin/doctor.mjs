#!/usr/bin/env node
// oxlint-disable no-console -- this is a CLI whose whole job is to print a report
// mqio-lint-doctor — verifies that the lint/format tools installed in the
// current package match the versions this config pins in its peerDependencies.
// Run it in CI (e.g. "lint:versions": "mqio-lint-doctor") to hard-fail on drift
// so every repo consuming @mainqueueio/eslint-config stays on the same tools.
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import semver from 'semver';

// Our own package.json is the source of truth for the pinned versions.
const selfRequire = createRequire(import.meta.url);
const pkg = selfRequire('../package.json');
const peers = pkg.peerDependencies ?? {};
const meta = pkg.peerDependenciesMeta ?? {};

// Resolve what the *consumer* has installed, from its own node_modules.
const consumerRequire = createRequire(
  pathToFileURL(join(process.cwd(), 'noop.js')),
);

const results = [];
for (const [name, range] of Object.entries(peers)) {
  const optional = meta[name]?.optional === true;
  let installed = null;
  try {
    installed = consumerRequire(`${name}/package.json`).version;
  } catch {
    // not installed
  }

  if (installed === null) {
    results.push(
      optional
        ? { name, ok: true, label: `skipped (optional, not installed)` }
        : { name, ok: false, label: `MISSING (expected ${range})` },
    );
  } else if (semver.satisfies(installed, range, { includePrerelease: true })) {
    results.push({ name, ok: true, label: `${installed} (matches ${range})` });
  } else {
    results.push({
      name,
      ok: false,
      label: `MISMATCH installed ${installed}, expected ${range}`,
    });
  }
}

const failures = results.filter((r) => !r.ok);
console.log(
  `mqio-lint-doctor — checking lint tool versions against ${pkg.name}@${pkg.version}\n`,
);
for (const r of results) {
  console.log(`  ${r.ok ? '✓' : '✗'} ${r.name.padEnd(12)} ${r.label}`);
}
console.log('');

if (failures.length > 0) {
  console.error(
    `✗ ${failures.length} issue(s). Install the pinned versions to match ${pkg.name}.`,
  );
  process.exit(1);
}
console.log('✓ All lint tool versions are consistent.');
