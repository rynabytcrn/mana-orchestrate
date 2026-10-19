---
name: mana-orchestrate
description: "The Grail grants wishes; Mana Orchestrate makes the mana flow to the right place at the right moment. It brings Einzbern, project memory, into Claude Code, Codex and DeepSeek Harness: recall before you start, write results back to the work item, record decisions as minutes, keep lessons as cards. Where Einzbern is not installed yet, it is the wizard: install, restore, update, migrate, uninstall, health check. Use it whenever Einzbern, work items, knowledge cards, minutes, .ether, or Atelier come up, or when the user asks to install or update it."
---
> [!WARNING]
> SOURCE PREPARATION ONLY / 仅源码配套准备 / ソース準備のみ / 소스 준비 전용 / Préparation source uniquement.
> This snapshot targets Einzbern source commit 41a3c974d77ac7dbe84b4852b08ebc705017fede, not a published release. 2.2.3 below is the source manifest version, NOT proof that a released 2.2.3 supports this workflow; 3.0.0 remains an unpublished target. Do not install, update, or dispatch from this preparation snapshot. Native collectors, dispatchers, and tool-result adapters are not shipped. The generated release-oriented instructions below are reference material, not release acceptance.


# Mana Orchestrate

Navigation for Einzbern 2.2.3: which engine verb to run at which moment. The engine generated this file for that version; do not edit it by hand.

## Navigation

Run a verb as `node "<device directory>/engine/einzbern.mjs" <verb> --<flag> <value>`. The device directory is `~/.einzbern`, or the directory `EINZBERN_HOME` names when it is set; if that file does not exist, Einzbern is not installed on this device yet, so treat the request as an install. Each verb prints one JSON object with a `reasonCode`; `commands` lists every verb, and `<verb> --help` lists one verb's flags. Give `--at` the current UTC instant, `YYYY-MM-DDTHH:MM:SSZ`, wherever a verb takes it. Inside a registered project the library is found from the current directory; pass `--workspace <library>` only elsewhere.

Several sessions can work in one library at the same time: the engine queues their writes, so no session has to stop or step aside for another. Except for a migration, never ask the user to stop the other sessions.

| Moment | Verb | What to do |
| --- | --- | --- |
| Starting work | `recall` | Before you start, run `recall --query "<the task in a few words>"` and read what comes back. |
| Need the full text | `work-show`, `minutes-show`, `work-project-context`, `execution-prepare`, `execution-record`, `execution-evidence` | Read the work item or the minutes whole (`--id` or `--external-key`) before relying on a headline. Before development dispatch, run `execution-prepare --id <work> --host <host> --category <category> --rejections <count> --requested-agents <count> --observations <machine-file> --output <new-private-file>`. The host supplies actual capabilities and fresh quota observations, never inferred tuples or retimestamped old usage. Do not ask the user to hand-fill JSON or repeatedly approve bookkeeping. Native collectors, dispatchers and tool-result adapters are not installed: report an unsupported mode once and stop its dispatch; do not request manual substitutes. Dispatch only when `dispatchAdmitted` is true and the target admission is admitted. Pass its selected runner/model/effort exactly; never substitute. Re-prepare immediately before dispatch and after policy, rejection, usage or batch changes: this is not a reusable permit or a global scheduler. Account for active agents separately. Retain actual invocation tuple, start time, stdout, stderr and exit code via `execution-record --binding <saved-file> --target <index> --process-return <machine-file> --output <new-private-file>`. It derives binding metadata and saves raw results, including failures and unavailable observations. See shipped `specs/dispatch-admission-evidence-v1.md` and command help. `execution-evidence --from-file <json>` remains read-only validation, not authentication. `work-project-context --execution-request <json>` remains available; a plain context read is not dispatch permission. Apply each project’s own configuration and check write permission independently; declarations are not publication proof. `gates-plan` and `gates-run --work-id <work>` resolve Cross Project targets separately. Each resolved target carries its own `handoff` (reference, work revision, configuration): a native host dispatch passes that object for that target, and gate processes receive the same object as `EINZBERN_PROJECT_CONTEXT`. An unresolved target stops only the work that needs it. Coordination-only work requires no invented development target. |
| Work is done | `work-transition`, `work-annotate` | Write the result back to the work item: `work-annotate` records what was done, `work-transition` moves its status on. |
| A decision is made | `minutes-record` | As soon as you judge that something is a decision, record it: each decision gets its number, D1 to Dn. End your reply with `已记 <minutes key> Dn` for each one (`Recorded <minutes key> Dn` when the conversation is not in Chinese). To replace, withdraw or stand beside a recorded decision (`minutes:<id>#D<n>`), declare it in the same record: `--supersedes <decision>=D<n>`, `--withdraws <decision>` or `--coexists <decision>`. |
| A lesson is learned | `knowledge-create` | Keep the lesson as a knowledge card. A card that replaces an older one names it with `--supersedes`. |
| UI design | `settings-catalog` | Before designing, read `design.authority` from `settings-catalog` and follow the design source it names. |

## Three steps

1. Install this skill: `npx skills add tpmoonchefryan/mana-orchestrate`, or ask the host to find the skill called Mana Orchestrate and install it.
2. In the project, say "install Einzbern". The wizard asks one screen of questions, confirms once, and sets up the engine and its hook for Claude Code and Codex together.
3. Then work as usual. Before every prompt the hook asks the engine for strongly relevant memory and puts it in the context; you record at the moments in the table above.

## Install-type tasks

For an install, restore, update, repair, rollback, migration, uninstall or health check, read the matching file in `references/` (`install.md`, `restore.md`, `update.md`, `migrate.md`, `uninstall.md`, `doctor.md`); never load them for any other work.
