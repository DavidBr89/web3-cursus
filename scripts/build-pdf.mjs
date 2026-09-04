import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const papersaurusEntry = require.resolve(
  "@axinom/docusaurus-plugin-papersaurus",
);
const papersaurusGenerator = new URL("./generate.js", `file://${papersaurusEntry}`);
const generatorPath = papersaurusGenerator.pathname;
let generatorSource = readFileSync(generatorPath, "utf8");

const quotedStylesheetPattern =
  'const regExp = /(?:|<link[^<>]*){1}href="([^<>]*styles[^<>]*?\\.css){1}"/g;';
const flexibleStylesheetPattern =
  'const regExp = /<link[^<>]*href=["\']?([^"\'\\s<>]*styles[^"\'\\s<>]*?\\.css)["\']?/g;';
const quotedScriptPattern =
  'const regExp = /(?:|<script[^<>]*){1}src="([^<>]*styles[^<>]*?\\.js){1}"/g;';
const flexibleScriptPattern =
  'const regExp = /<script[^<>]*src=["\']?([^"\'\\s<>]*?\\.js)["\']?/g;';

generatorSource = generatorSource
  .replace(quotedStylesheetPattern, flexibleStylesheetPattern)
  .replace(quotedScriptPattern, flexibleScriptPattern);

writeFileSync(generatorPath, generatorSource);

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npmCommand, ["run", "build", "--", "--no-minify"], {
  env: { ...process.env, BUILD_PDF: "1" },
  stdio: "inherit",
});

process.exit(result.status ?? 1);
