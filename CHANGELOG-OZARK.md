# CHANGELOG-OZARK

All Ozark-side patches applied on top of the upstream fork point (`upstream/cac5faf8af111b743bbf6a13f44b294140e6e711`). Upstream history is preserved in the main branch's git log up to that anchor.

## 2026-05-22 — Initial Ozark fork

- **Type:** initial setup
- **Reference:** internal pilot — Ozark internal stdlib bring-up
- **Author:** @bjcorder
- **Notes:** Renamed package to `osl-glob`, version reset to `0.0.1`. Removed `postversion: npm publish` and `prepublishOnly` scripts. Updated `repository.url` to fork. Added `OZARK-NOTES.md`, `CHANGELOG-OZARK.md`, `LICENSE-UPSTREAM`, Ozark README header. No functional trim applied in this pass.

## 2026-05-22 — Round-trip verification (no-op)

- **Type:** verification — no functional code change
- **Reference:** internal pilot verification step 2 (patch round-trip)
- **Author:** @bjcorder
- **Notes:** Benign CHANGELOG append to demonstrate the patch-and-SHA-bump loop end-to-end. No source or runtime behavior changed; consumers should bump the pinned SHA and observe identical test/scan outcomes.

## 2026-05-22 — Aggressive public-surface trim

- **Type:** trim — public API reduction
- **Reference:** consumer surface audit: `deterministic-deps` uses only the async `glob()` function
- **Author:** @bjcorder
- **Notes:** Reduced public exports from 18 named exports to 1 function + 4 type re-exports. Rewrote `src/index.ts` (224 → 52 LOC) to expose only `glob(pattern, options?)`. Removed `Glob` class methods: `walkSync`, `stream`, `streamSync`, `iterate`, `iterateSync`, `[Symbol.iterator]`, `[Symbol.asyncIterator]` (`src/glob.ts` 653 → 582 LOC). Removed `GlobWalker.walkSync()` and the entire `GlobStream` class from `src/walker.ts` (506 → 466 LOC). Deleted entire upstream `test/` directory (2,957 LOC), `examples/`, `tap-snapshots/`, `logo/`, benchmark scripts, `typedoc.json`, upstream collaboration docs. Net src LOC: 2,116 → 1,833 (13% reduction in retained source — modest because internal class hierarchies in `walker.ts`/`processor.ts` are interconnected; deeper surgery deferred to Phase 1c). Smoke test confirmed `glob('src/*.ts')` returns the 7 expected files.
