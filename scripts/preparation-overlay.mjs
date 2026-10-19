// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";

export const README_NAMES = Object.freeze(["README.md", "README.en.md", "README.ja.md", "README.ko.md", "README.fr.md"]);
export const SKILL_PATH = "skill/mana-orchestrate/SKILL.md";
export const NOTICE = "> [!WARNING]\n> SOURCE PREPARATION ONLY / 仅源码配套准备 / ソース準備のみ / 소스 준비 전용 / Préparation source uniquement.\n> This snapshot targets Einzbern source commit 41a3c974d77ac7dbe84b4852b08ebc705017fede, not a published release. 2.2.3 below is the source manifest version, NOT proof that a released 2.2.3 supports this workflow; 3.0.0 remains an unpublished target. Do not install, update, or dispatch from this preparation snapshot. Native collectors, dispatchers, and tool-result adapters are not shipped. The generated release-oriented instructions below are reference material, not release acceptance.\n\n";

export function overlayOffset(path, text) {
  if (README_NAMES.includes(path)) return 0;
  if (path !== SKILL_PATH) return null;
  assert.ok(text.startsWith("---\n"), "skill frontmatter must remain first");
  const end = text.indexOf("\n---\n", 4);
  assert.ok(end >= 0, "skill frontmatter terminator is required");
  return end + "\n---\n".length;
}

export function applyOverlay(path, canonical) {
  const offset = overlayOffset(path, canonical);
  if (offset === null) return canonical;
  assert.ok(!canonical.includes(NOTICE), "canonical input must not already have an overlay");
  return canonical.slice(0, offset) + NOTICE + canonical.slice(offset);
}

export function stripOverlay(path, prepared) {
  const offset = overlayOffset(path, prepared);
  if (offset === null) return prepared;
  assert.equal(prepared.indexOf(NOTICE), offset, `${path}: exact notice is required at its fixed entry point`);
  assert.equal(prepared.indexOf(NOTICE, offset + NOTICE.length), -1, `${path}: duplicate notice`);
  return prepared.slice(0, offset) + prepared.slice(offset + NOTICE.length);
}
