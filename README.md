# Mana Orchestrate

Mana Orchestrate 是 Einzbern（工作流引擎）的 Skill 载荷：告诉宿主 Agent 何时、怎样调用
Einzbern。本仓库只分发 `skill/mana-orchestrate/`：一份 `SKILL.md` 与 `references/`
下的指导文档，供 Claude Code 与 Codex 两个宿主读取。
旧名 tcrn-workflow-helper，新旧名对照见 Einzbern 词汇表的别名表。

引擎本身不由本仓库安装。本仓库不携带引导器、发布归档、SBOM 或发版门；它是一份文档载荷，
不是一条发布链路。

<!-- einzbern:release-identity:start -->
由 Einzbern 发布注入：引擎仓库与 Wiki 的地址、本载荷所配套的 Einzbern 版本、本载荷自身版本，
以及保持不变的上一对不可变发布。
<!-- einzbern:release-identity:end -->

本仓库中的版本号不构成发布或信任声明；trusted bootstrap、归档、provenance、
manifest 与 checksums 必须由候选构建生成，并在独立 bootstrap 摘要发布后才可受信。

## 安装

用 `skills` 安装器把 Skill 复制进两个宿主，命令由发布注入：

<!-- einzbern:release-identity:start -->
由 Einzbern 发布注入：`npx --yes skills@1.7.0 add` 的完整命令（仓库、标签与 Skill id），
带 `--global --agent claude-code --agent codex --copy --yes`。
<!-- einzbern:release-identity:end -->

`--copy` 是刻意的：宿主里必须是一份普通目录，符号链接不是有效的已安装副本。
安装器只放置文件，它不是信任根。

## 引擎版本对齐

**引擎版本对齐由工作区设置 `engine.requiredVersion` 承担，不由本仓库承担。**
容器用这个键声明它的记录是在哪一版引擎的契约下写的；不满足该声明的引擎按名拒绝，
并同时报出要求版本与运行版本，而不是把版本落后表现成链损坏。设置的读写与追问方式见
`skill/mana-orchestrate/references/platform-layout.md` 与
`skill/mana-orchestrate/references/first-run-wizard.md`。

## 仓库内容

| 路径 | 内容 |
| --- | --- |
| `skill/mana-orchestrate/SKILL.md` | Skill 根，带 `name` 与 `description` frontmatter |
| `skill/mana-orchestrate/references/` | 指导文档载荷 |
| `skill/mana-orchestrate/agents/openai.yaml` | 多宿主包装器的宿主元数据 |
| `skill/mana-orchestrate/scripts/create-skill-archive.mjs` | 生成确定性归档清单 |

## 完整文档

架构、命令参考、判据与门在 Einzbern 仓库的 GitHub Wiki（地址见上方发布注入块）。本仓库
不单独维护 Wiki。

## 许可

Apache-2.0，见 [LICENSE](./LICENSE)。
