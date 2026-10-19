#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
// Read-only validation of the helper; renderer writes only into an isolated temporary directory.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { stripOverlay } from "./preparation-overlay.mjs";

const root = resolve(import.meta.dirname, "..");
const engine = process.argv[2] && resolve(process.argv[2]);
assert.ok(engine, "usage: node scripts/verify-source-preparation.mjs <built pinned engine checkout>");
const lock = JSON.parse(await readFile(join(root, "source-preparation.json"), "utf8"));
assert.equal(lock.schemaVersion, 1);
assert.equal(lock.status, "source-preparation-only");
const git = (...args) => execFileSync("git", ["-C", engine, ...args], { encoding: "utf8" }).trim();
assert.equal(git("rev-parse", `${lock.engineCommit}^{tree}`), lock.engineTree);
assert.equal(git("rev-parse", "HEAD^{tree}"), lock.engineTree, "engine checkout must match pinned source tree");
assert.equal(git("status", "--porcelain", "--untracked-files=no"), "", "engine tracked sources must be clean");
assert.equal(JSON.parse(await readFile(join(engine, "package.json"), "utf8")).version, lock.sourceVersion);
const { renderHelperDocs } = await import(pathToFileURL(join(engine, "scripts/render-helper-docs.mjs")).href);
const scratch = await mkdtemp(join(tmpdir(), "mana-source-readback-"));
try {
  const report = await renderHelperDocs({ out: scratch, version: lock.sourceVersion, root: engine });
  assert.equal(report.reasonCode, "HELPER_DOCS_RENDERED");
  assert.equal(report.files.length, 16, "review changes to the generated inventory explicitly");
  const inventory = [];
  for (const path of report.files) {
    const canonical = await readFile(join(scratch, path));
    const actual = await readFile(join(root, path));
    assert.deepEqual(Buffer.from(stripOverlay(path, actual.toString("utf8"))), canonical, `${path}: complete canonical bytes must match`);
    inventory.push({ path, sha256: createHash("sha256").update(actual).digest("hex") });
  }
  const preserved = "skill/mana-orchestrate/scripts/create-skill-archive.mjs";
  const bytes = await readFile(join(root, preserved));
  assert.equal(createHash("sha256").update(bytes).digest("hex"), lock.preservedArchiveSha256);
  const walk = async (dir, prefix = "") => {
    const files = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) files.push(...await walk(join(dir, entry.name), path));
      else files.push(`skill/mana-orchestrate/${path}`);
    }
    return files;
  };
  assert.deepEqual((await walk(join(root, "skill/mana-orchestrate"))).sort(), [...report.files.filter(path => path.startsWith("skill/")), preserved].sort(), "no hidden extra skill payload");
  console.log(JSON.stringify({ ok: true, scope: lock.status, engineCommit: lock.engineCommit, engineTree: lock.engineTree, helperCommit: execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(), engineCheckoutCommit: git("rev-parse", "HEAD"), sourceVersion: lock.sourceVersion, targetRelease: lock.targetRelease, generatedFiles: inventory, preservedArchiveSha256: lock.preservedArchiveSha256, formalReleaseAcceptance: false }, null, 2));
} finally {
  await rm(scratch, { recursive: true, force: true });
}
