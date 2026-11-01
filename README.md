# rsbuild-plugin-cloudflare: `.wasm` module missing after the first dev rebuild

In `rsbuild dev`, a Worker that imports a `.wasm` file through an intermediate
module starts fine, then fails as soon as any file is edited:

    Uncaught Error: No such module "add-f61fd62f.wasm". imported from "index.js"
    MiniflareCoreError [ERR_RUNTIME_FAILURE]: The Workers runtime failed to start.

`rsbuild build` is fine and emits `add-f61fd62f.wasm`.

## Reproduce

    bun install
    bun run dev            # http://localhost:4123
    curl localhost:4123    # -> "sum: 3"
    # edit src/index.ts (e.g. change "sum" to "total") and save
    curl localhost:4123    # -> 500, "No such module add-f61fd62f.wasm"

Importing the `.wasm` directly from the entry does not reproduce it.
The importing module has to be one that is not rebuilt (`src/wasm-module.ts`
stands in for a dependency such as `@takumi-rs/wasm/bundlers/workerd.js`).

## Cause

`additionalModulesPlugin` calls `additionalModules.clear()` in
`compiler.hooks.thisCompilation`, but entries are only added again from the
`externals` callback. On a rebuild, rspack does not re-run `externals` for the
unchanged module, so the map stays empty, the `.wasm` is not re-emitted, and the
chunk still references it.

Commenting out `additionalModules.clear()` (dist/index.mjs:86238) makes
rebuilds work.

## Versions

rsbuild-plugin-cloudflare 0.0.2, @rsbuild/core 2.2.12, cf 1.0.0-beta.24
