# OZARK-NOTES

**Forked from:** isaacs/node-glob@cac5faf8af111b743bbf6a13f44b294140e6e711 (2026-05-22)
**Anchor tag in this repo:** `upstream/cac5faf8af111b743bbf6a13f44b294140e6e711`

## Surface kept

Exactly one public export: the async `glob(pattern, options?)` function. Returns `string[]` by default; returns `Path[]` when `options.withFileTypes === true`.

This is the entire surface used by `deterministic-deps`:

- `deterministic-deps/src/scanner.ts:3` — `import { glob } from 'osl-glob'`
- `deterministic-deps/src/scanner.ts:40` — `await glob(patterns, { ... })`

The type re-exports (`GlobOptions`, `GlobOptionsWithFileTypesFalse`, `GlobOptionsWithFileTypesTrue`, `GlobOptionsWithFileTypesUnset`) remain available for consumers that want type-level access.

## Surface removed

Public-surface trim from upstream's 18 named exports down to **1 function + 4 type re-exports**.

**Removed exports (from `src/index.ts`):**
- `escape`, `unescape` (re-exports from `minimatch`)
- `Glob` class (still used internally by `glob()`, but no longer exported)
- `Ignore` class
- `hasMagic`
- All sync / streaming / iterating variants:
  - `globStreamSync`, `globStream`, `globSync`, `globIterateSync`, `globIterate`
  - Aliases: `streamSync`, `stream`, `iterateSync`, `iterate`, `sync`
- The `Object.assign(glob_, { ... })` cluster attaching `globSync`, `Glob`, `hasMagic`, `escape`, etc. to the `glob` function

**Removed Glob class methods (`src/glob.ts`):**
- `walkSync()`, `stream()`, `streamSync()`, `iterate()`, `iterateSync()`
- `[Symbol.iterator]()`, `[Symbol.asyncIterator]()`
- Net: 96 LOC removed from glob.ts.

**Removed GlobWalker class methods (`src/walker.ts`):**
- `walkSync()` (only reachable via the removed `Glob.walkSync`).
- The entire `GlobStream` class (only reachable via the removed `Glob.stream`/`streamSync`).
- Net: 51 LOC removed from walker.ts.

**Directory-level deletes:**
- `test/` (entire upstream test suite — exercised removed surface; smoke tests for the kept surface are Phase 1b).
- `examples/`, `tap-snapshots/`, `logo/`, `oh-my-glob.gif` — documentation noise.
- `benchmark.sh`, `benchclean.cjs`, `make-benchmark-fixture.sh`, `patterns.sh`, `prof.sh` — benchmarking infrastructure.
- `scripts/make-big-tree.js` — benchmark fixture generator.
- `typedoc.json` — typedoc config (not generating docs in this fork).
- `AGENTS.md`, `CONTRIBUTING.md`, `changelog.md` — upstream collaboration docs that do not apply here.

**Internals NOT trimmed (deliberately):**
- `walker.ts` still contains the `GlobUtil` abstract base + the synchronous `walkCBSync` code path. These are class internals that are now dead but pulling them out requires deeper surgery without security upside. Future iteration.
- `processor.ts`, `pattern.ts`, `has-magic.ts`, `ignore.ts` — left intact; they are the dependency tree of the kept `glob()` → `Glob` → `GlobWalker` → `walk()` path.

## Build / runtime notes

- Build is driven by upstream's `prepare` script (`tshy && bash scripts/build.sh`) which runs automatically when a consumer installs via git URL. Produces `dist/commonjs/` (~87 KB) and `dist/esm/` (~82 KB).
- `dist/` is gitignored upstream; the Ozark fork preserves that convention. Consumers MUST trigger `prepare` on install (default npm behavior for git deps).
- Own runtime dependencies (`minimatch ^10.2.4`, `minipass ^7.1.3`, `path-scurry ^2.0.2`) currently resolve from upstream npm. Note: even though `minimatch` exists in this org as `osl-minimatch`, this fork has not been rewired to consume it — Phase 2 work.
- Publish scripts (`postversion: npm publish`, `prepublishOnly: ...`) were removed to defuse accidental registry publication.
