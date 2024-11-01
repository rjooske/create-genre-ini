import * as esbuild from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "public/index.js",
  sourcemap: "inline",
  plugins: [polyfillNode()],
});
