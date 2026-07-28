[![[Release] Publish Canary Version](https://github.com/MainQueueIO/typescript-style/actions/workflows/canary.yml/badge.svg?branch=main)](https://github.com/MainQueueIO/typescript-style/actions/workflows/canary.yml) [![[Release] Release Stable Version](https://github.com/MainQueueIO/typescript-style/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/MainQueueIO/typescript-style/actions/workflows/release.yml) [![[PR] Lint & Format Code](https://github.com/MainQueueIO/typescript-style/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/MainQueueIO/typescript-style/actions/workflows/lint.yml)

# MainQueueIO's typescript-styles repo

Shared configurations for Eslint, Prettier & Oxlint for all TS ecosystem code styles for MainQueue

## Monorepo usage (turborepo / bun workspaces)

This package ships `oxlint` and `oxfmt` as its own executables. They resolve the
bundled binaries from the config package itself and default to the shared config,
so you don't need to install or configure `oxlint`/`oxfmt` separately.

Because Node only links a package's `bin` entries into the `node_modules/.bin` of
its **direct** dependents, install this package in **each package that lints** —
not only at the workspace root:

```jsonc
// packages/<name>/package.json
{
  "devDependencies": {
    "@mainqueueio/eslint-config": "^0.2.0"
  }
}
```

Then the commands are available inside that package (Turbo runs scripts from the
package directory), using the bundled config automatically:

```jsonc
{
  "scripts": {
    "lint:fmt": "oxfmt --check",
    "lint:oxc": "oxlint --deny-warnings"
  }
}
```

Pass `-c` / `--config` to override the bundled config; otherwise the shared
`oxlint-base.json` / `.oxfmtrc.json` is applied.
