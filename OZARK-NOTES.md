# OZARK-NOTES

**Forked from:** isaacs/node-glob@cac5faf8af111b743bbf6a13f44b294140e6e711 (2026-05-22)
**Anchor tag in this repo:** `upstream/cac5faf8af111b743bbf6a13f44b294140e6e711`

## Surface kept

This is a v0.0.1 first-pass fork. No functional trim has been applied yet; the surface kept is the full upstream API. Concrete consumer surface to date:

- `glob` (named export, the promise-returning glob function) — used by `deterministic-deps/src/scanner.ts`.

Future iterations will narrow the surface to just what active consumers exercise.

## Surface removed

None in this initial fork. The first surface trim is a Phase 1b follow-up once the end-to-end consumption loop is validated.

## Build / runtime notes

- Built with `tshy` (`npm run prepare` → `dist/esm/` and `dist/commonjs/`). Dist artifacts are not committed; consumers consuming via git URL must run `npm install` to trigger the `prepare` script.
- `engines.node`: `18 || 20 || >=22`. Consumer `deterministic-deps` requires Node `>=24` so this is compatible.
- Own deps (not yet rewired to osl-* forks):
  - `minimatch ^10.2.4` — also forked separately as `osl-minimatch`; the rewire to consume `osl-minimatch` here is a Phase 1b follow-up.
  - `minipass`, `path-scurry` — transitive from consumer's POV; per pilot policy ("direct deps + selective vendoring") these stay upstream.
- Publish-related npm scripts (`postversion: npm publish`, `prepublishOnly`) were removed to defuse accidental registry publication. This fork is consumed via git URL only.
