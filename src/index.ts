import addModule from "./wasm-module";

export default {
  async fetch() {
    const { exports } = await WebAssembly.instantiate(addModule);
    return new Response(`sum: ${(exports.add as (a: number, b: number) => number)(1, 2)}\n`);
  },
};
