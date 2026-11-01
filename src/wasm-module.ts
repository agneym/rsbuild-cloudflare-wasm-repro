// Stands in for a dependency like @takumi-rs/wasm/bundlers/workerd.js:
// a module that only re-exports a .wasm file and never changes.
import module from "./add.wasm";

export default module;
