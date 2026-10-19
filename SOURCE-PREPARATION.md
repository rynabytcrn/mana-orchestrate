# Mana Orchestrate source companion preparation

This branch is source wiring only, not an installable paired release. It synchronizes the
helper to [Einzbern source 41a3c974](https://github.com/tpmoonchefryan/einzbern/commit/41a3c974d77ac7dbe84b4852b08ebc705017fede)
(PR #28 merge). `source-preparation.json` pins the full commit and tree. The engine source
manifest still says **2.2.3**; that number here does not assert compatibility with a published
2.2.3 archive. **3.0.0 remains an unpublished release target.** No version was published.
Do not install, update, or dispatch using this preparation snapshot.

## Inventory and boundaries

- Sixteen managed files are rendered by the pinned engine: five language READMEs,
  package.json, SKILL.md, agents/openai.yaml, six lifecycle references, install.mjs and
  trash-empty.mjs. This refresh includes machine prepare/record navigation, diagnostic
  details, installer verification, and DeepSeek Harness profile discovery documentation.
- `skill/mana-orchestrate/scripts/create-skill-archive.mjs` is preserved byte for byte from
  helper base `7f3d75fdb315515f79ad09966ed984a1c7a33c2f`; its SHA-256 is pinned in the manifest.
- Machine preparation and result recording are engine interfaces, not native host execution.
  A host must supply real fresh observations, actual capabilities, and actual process returns.
  There is no shipped native collector, dispatcher, or tool-result adapter. Unsupported modes
  stop their dispatch once, without user-filled JSON or repeated human approval substitutes.
  No guessed quota, invented streams/exit codes, model/effort substitution, or cross-host fallback.
- DSH discovery/diagnosis is read-only. The plugin must be installed/configured in DSH;
  documenting its discovery does not prove a real DSH session was exercised.
- This PR neither runs formal `release generate`/`finish` nor bypasses their gates. It does
  not install an engine, edit live host configuration, write project memory/history, publish
  a tag/release, or claim real-host, lifecycle, release, security, or crash/race acceptance.

## Reproducible preparation overlay

The engine renderer has no source-preparation mode. Its release-oriented README and Skill
wording is retained canonically, but a deterministic warning is inserted at each entry:
byte zero in all five READMEs and immediately after the YAML frontmatter in SKILL.md.
The exact literal and positions live in `scripts/preparation-overlay.mjs`. No other generated
bytes may change. Validation requires exactly one unchanged warning at each exact position,
strips only that literal, then compares the entire remaining file with freshly rendered bytes.
It never performs broad normalization, version replacement, or permissive partial matching.
The normal renderer install-tree digest is not a digest of this overlaid preparation tree.

## Verification

The `Source companion verification` workflow is the complete helper-specific CI for this PR:

1. Check out the exact candidate SHA and pinned engine SHA with read-only permissions.
2. Use Node 24.16.0 and pnpm 11.3.0; acquire engine dependencies with its frozen lockfile
   and lifecycle scripts disabled. Build the pinned renderer, including its type check.
3. Run all helper contract tests and syntax-check all helper JavaScript scripts/tests.
4. Render to a disposable directory; verify all sixteen files, exact overlay placement,
   skill inventory and preserved archive script. Retain a public-source-only readback artifact.

Local equivalents after building the pinned engine:

```sh
node --test tests/*.test.mjs
node scripts/verify-source-preparation.mjs /path/to/built-pinned-einzbern
```

The engine checkout must have the pinned tree and no tracked modifications. An equivalent
pre-merge commit with that exact tree is accepted locally; CI checks out the pinned merge SHA.
Renderer readback writes only to a temporary directory; it does not execute install/uninstall,
collect observations, dispatch agents, or invoke a real device/library. Existing engine-wide
CI is not replaced or redundantly relabeled as helper acceptance.

## Formal release handoff

When the real host and formal paired-release prerequisites are satisfied, use the engine's
normal paired release workflow and its real receipts to choose/finalize the version and
regenerate both repositories. Regeneration removes these six preparation warnings by
replacing the managed files. In that same reviewed release batch, retire this preparation
manifest, overlay, verification tests/workflow, and document (or explicitly replace them with
release-appropriate verification); do not retain source-only pins as claims of release proof.
Preserve the archive script through the release tool's explicit keep-extra mechanism. Do not
copy this preparation snapshot or the earlier 3.0.0 diagnostic preview into a release and call
it generated/finished. Verify the final paired artifacts and their digests independently.
