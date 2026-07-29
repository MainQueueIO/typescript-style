[![[Release] Publish Canary Version](https://github.com/MainQueueIO/typescript-style/actions/workflows/canary.yml/badge.svg?branch=main)](https://github.com/MainQueueIO/typescript-style/actions/workflows/canary.yml) [![[Release] Release Stable Version](https://github.com/MainQueueIO/typescript-style/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/MainQueueIO/typescript-style/actions/workflows/release.yml) [![[PR] Lint & Format Code](https://github.com/MainQueueIO/typescript-style/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/MainQueueIO/typescript-style/actions/workflows/lint.yml)

# MainQueueIO's typescript-styles repo

Shared configurations for Eslint, Prettier & Oxlint for all TS ecosystem code styles for MainQueue

## What this package provides

This package ships the **configuration content** (eslint flat config, prettier
config, oxlint & oxfmt base configs) via its exports. The linters themselves
(`eslint`, `prettier`, `oxlint`, `oxfmt`) plus `concurrently` (used to run lint
scripts in parallel) are declared **both** as bundled `dependencies` and as
`peerDependencies`, pinned to the same versions — so both repo layouts work:

- **Single-package repos** (default hoisted linker) get the tools transitively;
  installing this package is enough — no need to install the linters separately.
- **Monorepos** using an isolated/strict linker (bun `--linker isolated`, pnpm)
  do **not** hoist transitive dependencies, so each package must install the tools
  itself. `mqio-lint-doctor` enforces that they match the pinned versions.

`typescript` is a peer only (range, optional) since every project brings its own.

## Install

**Single-package repo** — installing the config is enough; the linters come bundled:

```sh
bun add -d @mainqueueio/eslint-config
```

**Monorepo (isolated linker)** — install the linters in **every** package that
lints (per package, not just the root) so they resolve locally:

```sh
bun add -d @mainqueueio/eslint-config eslint prettier oxlint oxfmt concurrently typescript
```

The versions are pinned in this package's `peerDependencies`; `mqio-lint-doctor`
keeps consumers in sync (see [Version consistency](#version-consistency)).

## Wire up the configs

```js
// eslint.config.mjs        (or '@mainqueueio/eslint-config/eslint-vue')
export { default } from '@mainqueueio/eslint-config/eslint';
```

```js
// prettier.config.mjs
export { default } from '@mainqueueio/eslint-config/prettier';
```

```jsonc
// .oxlintrc.json — oxlint's `extends` needs a file PATH (a package specifier is
// silently ignored). The node_modules path resolves via the top-level symlink,
// even under an isolated linker.
{ "extends": ["./node_modules/@mainqueueio/eslint-config/dist/oxlint-base.json"] }
```

```ts
// oxfmt.config.ts — oxfmt has no `extends`, so import the base and spread it.
// oxfmt auto-discovers `oxfmt.config.ts` (the `.ts` extension specifically).
import base from '@mainqueueio/eslint-config/oxfmt' with { type: 'json' };

export default { ...base /* , overrides here */ };
```

Suggested scripts (run in parallel with your tool of choice):

```jsonc
{
  "scripts": {
    "lint:oxc": "oxlint",
    "lint:fmt": "oxfmt --check",
    "lint:es": "eslint .",
    "lint:format": "prettier -c .",
    "lint:versions": "mqio-lint-doctor"
  }
}
```

> Type-aware oxlint (`--type-aware` / `--tsconfig`) additionally needs
> `oxlint-tsgolint` installed directly in the package.

## Version consistency

`mqio-lint-doctor` (shipped by this package) reads this package's
`peerDependencies` and checks the versions installed in the current package,
exiting non-zero on any mismatch or missing tool. Run it in CI to hard-fail on
drift so every repo stays on the same linters:

```sh
mqio-lint-doctor
```

```
mqio-lint-doctor — checking lint tool versions against @mainqueueio/eslint-config@x.y.z

  ✓ concurrently 9.2.1 (matches 9.2.1)
  ✓ eslint       9.39.4 (matches 9.39.4)
  ✓ oxfmt        0.45.0 (matches 0.45.0)
  ✗ oxlint       MISMATCH installed 1.59.0, expected 1.60.0
  ...
```
