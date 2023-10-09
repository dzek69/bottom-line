import {run} from "./utils.mjs";

(async () => {
    console.info("[ESM compile post-processing started]");
    await run("resolve-tspaths", ["--project", "tsconfig.esm.json"]);
    console.info("Resolved TypeScript import paths");
    console.info("[ESM compile post-processing ended]");
})();
