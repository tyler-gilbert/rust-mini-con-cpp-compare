import { cpSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const revealRoot = fileURLToPath(new URL("../reveal.js/", import.meta.url));

export default {
  root: revealRoot,
  base: "./",
  publicDir: "public",
  build: {
    outDir: "presentation",
    emptyOutDir: true,
  },
  plugins: [
    {
      name: "copy-reveal-runtime",
      closeBundle() {
        cpSync(resolve(revealRoot, "dist"), resolve(revealRoot, "presentation/dist"), {
          recursive: true,
        });
      },
    },
  ],
};
