// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { applyOverlay, stripOverlay, NOTICE, README_NAMES, SKILL_PATH } from "../scripts/preparation-overlay.mjs";
const root = resolve(import.meta.dirname, "..");
const read = (path) => readFile(resolve(root, path), "utf8");

for (const path of [...README_NAMES, SKILL_PATH]) {
  test(`${path}: notice roundtrip is exact; absent, moved, duplicate and changed notices fail`, () => {
    const canonical = path === SKILL_PATH ? "---\nname: mana-orchestrate\n---\n\n# Skill\n" : "# README\n";
    const prepared = applyOverlay(path, canonical);
    assert.equal(stripOverlay(path, prepared), canonical);
    assert.throws(() => stripOverlay(path, canonical));
    assert.throws(() => stripOverlay(path, canonical + NOTICE));
    assert.throws(() => stripOverlay(path, prepared + NOTICE));
    assert.throws(() => stripOverlay(path, prepared.replace("SOURCE PREPARATION ONLY", "RELEASED")));
    assert.throws(() => applyOverlay(path, prepared));
    if (path === SKILL_PATH) assert.ok(prepared.startsWith("---\nname:"));
  });
}
test("non-entry generated files are not normalized", () => {
  const bytes = "  exact text\r\n";
  assert.equal(stripOverlay("package.json", bytes), bytes);
  assert.equal(applyOverlay("package.json", bytes), bytes);
});
test("machine dispatch boundary and result recording remain explicit", async () => {
  const skill = stripOverlay(SKILL_PATH, await read(SKILL_PATH));
  for (const phrase of ["execution-prepare", "execution-record", "execution-evidence", "dispatchAdmitted", "Re-prepare immediately before dispatch", "Account for active agents separately", "actual invocation tuple, start time, stdout, stderr and exit code", "Do not ask the user to hand-fill JSON or repeatedly approve bookkeeping", "Native collectors, dispatchers and tool-result adapters are not installed", "never substitute", "not authentication"]) assert.ok(skill.includes(phrase), phrase);
});
test("DSH discovery is read-only and diagnostics do not install the plugin", async () => {
  const doctor = await read("skill/mana-orchestrate/references/doctor.md");
  for (const phrase of ["DSH_PLUGIN_HOOK_PATH_MISMATCH", "DSH_PLUGIN_MISSING", "DSH_PROFILE_UNREADABLE", "Doctor and setup never write a", "DSH profile"]) assert.ok(doctor.includes(phrase), phrase);
  assert.ok((await read("skill/mana-orchestrate/references/install.md")).includes("dshPlugin"));
});
test("manifest version is source identity only and release target stays separate", async () => {
  const lock = JSON.parse(await read("source-preparation.json"));
  assert.equal(lock.status, "source-preparation-only");
  assert.equal(JSON.parse(await read("package.json")).version, lock.sourceVersion);
  assert.equal(lock.sourceVersion, "2.2.3");
  assert.equal(lock.targetRelease, "3.0.0");
  assert.match(lock.engineCommit, /^[a-f0-9]{40}$/);
  assert.match(lock.engineTree, /^[a-f0-9]{40}$/);
});
