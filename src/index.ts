// Ozark-trimmed index: only the public `glob` async function is exported.
// Upstream's globStreamSync/globStream/globSync/globIterateSync/globIterate
// helpers plus the `Glob`, `Ignore`, `hasMagic`, `escape`, `unescape` exports
// and the `glob.sync` / `glob.stream` / `glob.iterate` aliases were dropped —
// the consumer (deterministic-deps) calls only the async `glob(pattern, opts)`
// form. See OZARK-NOTES.md.

import { Glob } from './glob.js'
import type {
  GlobOptions,
  GlobOptionsWithFileTypesFalse,
  GlobOptionsWithFileTypesTrue,
  GlobOptionsWithFileTypesUnset,
} from './glob.js'
import type { Path } from 'path-scurry'

// Re-export the option types so consumers can type-import them.
export type {
  GlobOptions,
  GlobOptionsWithFileTypesFalse,
  GlobOptionsWithFileTypesTrue,
  GlobOptionsWithFileTypesUnset,
} from './glob.js'

/**
 * Asynchronous glob — the only public surface in this Ozark fork.
 *
 * Returns string paths by default. When `withFileTypes: true` is set in
 * `options`, returns `Path` objects from `path-scurry` instead.
 */
export async function glob(
  pattern: string | string[],
  options?: GlobOptionsWithFileTypesUnset | undefined,
): Promise<string[]>
export async function glob(
  pattern: string | string[],
  options: GlobOptionsWithFileTypesTrue,
): Promise<Path[]>
export async function glob(
  pattern: string | string[],
  options: GlobOptionsWithFileTypesFalse,
): Promise<string[]>
export async function glob(
  pattern: string | string[],
  options: GlobOptions,
): Promise<Path[] | string[]>
export async function glob(
  pattern: string | string[],
  options: GlobOptions = {},
) {
  return new Glob(pattern, options).walk()
}
