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
