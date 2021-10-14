import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

const options = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    name: "toNestedObject",
    format: "umd",
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: ["node_modules/**"],
    }),
    typescript()
  ],
}

/* add terset if on production */
if (process.env.NODE_ENV === "production") {
  options.plugins.push(terser())
}

export default options
