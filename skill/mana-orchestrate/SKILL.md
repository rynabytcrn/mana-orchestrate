---
name: mana-orchestrate
description: "The Grail grants wishes; Mana Orchestrate makes the mana flow to the right place at the right moment. It brings Einzbern, project memory, into Claude Code, Codex and DeepSeek Harness: recall before you start, write results back to the work item, record decisions as minutes, keep lessons as cards. Where Einzbern is not installed yet, it is the wizard: install, restore, update, migrate, uninstall, health check. Use it whenever Einzbern, work items, knowledge cards, minutes, .ether, or Atelier come up, or when the user asks to install or update it."
---

# Mana Orchestrate

Navigation for Einzbern 3.4.0: engine-generated; do not hand-edit.

Execution protocol: tcrn.host-execution-request.v1.

## Navigation

Run `node "<device directory>/engine/einzbern.mjs" <verb> --<flag> <value>`. Root: `~/.einzbern` or `EINZBERN_HOME`; if missing, install first. `commands` / `<verb> --help`: verbs/flags. Use current UTC `--at` and `--workspace <library>` as required. Closed inputs: actual engine bundle root `specs/` (beside `scripts/`), not this Skill.

Local sessions share queued writes without stepping aside, not cross-device exclusion. Remote submission needs serial handoff. No platform-native dot hook, background lifecycle manager or sync service is installed.

| Moment | Verb | What to do |
| --- | --- | --- |
| Starting work | `recall`, `rule-list` | Run `recall --query "<task>"`. New/resumed/delegated sessions read AGENTS, Skill and work; parent or patrol reads do not substitute. Read enabled rules, not catalog defaults. Dot blocker recovery/privacy-publication: `specs/dot-rules-v1.md`. |
| Draft by work type | `work-draft` | Types/defects, inherited constraints and source gaps: `specs/work-content-v1.md`. One native content, not a second acceptance copy. |
| Need the full text | `work-show`, `work-content-context`, `minutes-show`, `work-project-context`, `execution-prepare`, `execution-record`, `execution-evidence` | Read whole work/minutes and each target's `handoff`; a native host dispatch passes that object for that target, gates receive the same object as `EINZBERN_PROJECT_CONTEXT`. An unresolved target stops only the work that needs it. Coordination-only work requires no invented development target. `specs/context-v1.md`: segments/digests; retain critical clauses. Legacy `--execution-request`: `dispatchAdmitted` is true. Pass its selected runner/model/effort exactly, never substitute; retain stdout, stderr and exit code. Evidence is not a reusable permit or a global scheduler. `execution-evidence --from-file <json>` remains read-only validation, not authentication. `specs/dispatch-admission-evidence-v1.md`. |
| Native dispatch (Codex, Claude, dot) | `execution-host-prepare`, `execution-host-record`, `execution-host-evidence`, `execution-codex-peer-record`, `execution-codex-peer-evidence` | Authorized tools; normal prompt reports. No runtime adapter or optional telemetry prerequisite. Existing class fallback authority unless explicitly hard. Parent reads before dispatch, child reads before work. targets=[]: no binding; scope/permission. machine-assemble inputs, never hand-fill JSON; raw returns/reports, actual status/attempt association, `--binding`/`--prior`. Unknown retains responsibility; query unknown before retry. Cancel acknowledgement is not termination. Dot model selection is host-managed. Validity, finality and review differ; authorized saves. `specs/host-fallback-v1.md`. Codex only: independent main/economy peers, no collector. `docs/codex-native-controller.md`. Other hosts keep their workflow. |
| Shared submission | `shared-submit-plan`, `shared-submit-evidence`, `shared-submit-advisory-read`, `shared-submit-advisory-write` | Complete baseline and engine changes; one complete pre-submit refresh and engine reapply; serial handoff; segments before manifest; verify remote bytes and complete destination replay; observe release. Advisory is not a lock; absence/age grants nothing. Query unknown publication before retry. `specs/shared-submit-v1.md`. |
| Configuration backup or restore | `config-backup-plan`, `config-backup-create`, `config-backup-verify`, `config-backup-list`, `config-backup-resume`, `config-backup-retire`, `config-restore-plan`, `config-restore-apply` | Allowlist only: no secrets, identity, runtime or generated projections. Preserve originals; supported setters/readback. Unapproved policy blocks creation/daily enablement. `specs/config-backup-v1.md`. |
| Work is done | `work-transition`, `work-annotate` | Actual actor/readback. Pending is not complete. Compare original source, behavior and assertions; structure is not semantic acceptance. Dot/local consumption separately; unavailable remains unverified. |
| A decision is made | `minutes-record` | As soon as you judge a decision, record D1–Dn; end with `已记 <minutes key> Dn` (`Recorded <minutes key> Dn` in English). Prior: `--supersedes`/`--withdraws`/`--coexists`. |
| A lesson is learned | `knowledge-create`, `knowledge-capture` | An INIT batch covers all pending Stories; preserve approved roles/stages. Capture at most five sourced lessons with `knowledge-capture`; read back. No dynamic progress in AGENTS. |
| UI design | `settings-catalog` | Read optional `design.authority`; follow it, never invent it. |

## Three steps

1. Install this skill: `npx skills add tpmoonchefryan/mana-orchestrate`.
2. Say "install Einzbern". Traditional hooks or independent dot target: `setup`; approval: install.md.
3. Installation, policy changes, restoration and publication retain their separate approvals. 20-minute patrol and daily 00:00 Asia/Shanghai backup are independent; unapproved policy forbids daily enablement; unknown stays unknown.

## Install-type tasks

Install/restore/update/repair/rollback/migrate/uninstall/doctor: read `references/` (`install.md`, `restore.md`, `update.md`, `migrate.md`, `uninstall.md`, `doctor.md`); dot: install; never load them for any other work.
