import { terser } from "rollup-plugin-terser"
import typescript from '@rollup/plugin-typescript'

const def = {
  plugins: [
    typescript()
  ],
}

/* add terset if on production */
if (process.env.NODE_ENV === "production") {
  def.plugins.push(terser())
}

const conf = [
  {
    ...def,
    input: "src/nestedMultiPart.ts",
    output: {
      dir: "dist",
      name: "nestedMultiPart",
      format: "umd",
    },
  },
  {
    ...def,
    input: "src/index.ts",
    output: {
      dir: "dist",
      name: "nestedMultiPart",
      format: "umd",
    },
  },
  {
    ...def,
    input: "src/nestedParser.ts",
    output: {
      dir: "dist",
      name: "nestedMultiParser",
      format: "umd",
    },
  }
]

export default conf
