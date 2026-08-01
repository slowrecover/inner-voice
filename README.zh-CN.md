# inner-voice

[English](README.md)

一组可安装到 Codex 和 Claude Code 的 Skill。它会抓住：处境变成了对你的判决的那一刻。

```text
你：“我还没挣到钱。我是废物。”

Inner Voice：
“刚才主语换了：本来在说‘我还没挣到钱’，后来变成了‘我是废物’。
先把事实放回来：我目前还没有收入。”
```

**它不是安慰。** 它只指出一次语言里发生的变化，把可以观察的事实放回来，然后退出。

Codex + Claude Code · English + 中文 · 不追踪、不记录 · 不用治疗师口吻 · 不强行积极

## 选择版本

| 语言 | Codex | Claude Code |
| --- | --- | --- |
| English | `skills/codex/inner-voice-en` | `skills/claude-code/inner-voice-en` |
| 中文 | `skills/codex/inner-voice-zh` | `skills/claude-code/inner-voice-zh` |

Codex 和 Claude Code 版遵循同一套行为规则，只因为安装位置和调用方式不同而分别打包。你可以只装一种语言，也可以两种都装。

## 安装到 Codex

macOS / Linux / WSL：

```bash
git clone https://github.com/slowrecover/inner-voice.git
mkdir -p ~/.agents/skills
cp -R inner-voice/skills/codex/inner-voice-en ~/.agents/skills/
cp -R inner-voice/skills/codex/inner-voice-zh ~/.agents/skills/
```

Windows PowerShell：

```powershell
git clone https://github.com/slowrecover/inner-voice.git
New-Item -ItemType Directory -Force "$HOME\.agents\skills" | Out-Null
Copy-Item -Recurse ".\inner-voice\skills\codex\inner-voice-en" "$HOME\.agents\skills\"
Copy-Item -Recurse ".\inner-voice\skills\codex\inner-voice-zh" "$HOME\.agents\skills\"
```

主动调用：`$inner-voice-en` 或 `$inner-voice-zh`。当对话符合 description 时，Codex 也可以自动读取。

## 安装到 Claude Code

macOS / Linux / WSL：

```bash
git clone https://github.com/slowrecover/inner-voice.git
mkdir -p ~/.claude/skills
cp -R inner-voice/skills/claude-code/inner-voice-en ~/.claude/skills/
cp -R inner-voice/skills/claude-code/inner-voice-zh ~/.claude/skills/
```

Windows PowerShell：

```powershell
git clone https://github.com/slowrecover/inner-voice.git
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse ".\inner-voice\skills\claude-code\inner-voice-en" "$HOME\.claude\skills\"
Copy-Item -Recurse ".\inner-voice\skills\claude-code\inner-voice-zh" "$HOME\.claude\skills\"
```

主动调用：`/inner-voice-en` 或 `/inner-voice-zh`。当对话符合 description 时，Claude Code 也可以自动读取。

如果 Skill 目录是在 Claude Code 会话已经打开后第一次创建的，重新开一个会话即可。

## 它会留意什么

- **身份判决：** 一次受挫变成了“我就是这种人”。
- **总是 / 从不：** 一次或几次发生过的事，变成了一条永远不会改变的规律。
- **灾难化：** 一个难熬的当下，变成了整个未来。
- **替别人下结论：** 对别人想法的猜测，被说成了已经确定的事实。
- **比较式判决：** 别人可见的进度，变成了自己正在失败的证据。
- **把感受当证明：** 感到卡住或无能，变成了“我就是如此”的证明。
- **隐形规则：** 一个默认的“应该/必须”时间表，变成了对自己的审判。

普通对话里，它只做一次简短纠正：说清具体发生了哪一种变化，把事实放回来，然后继续处理用户本来在谈的事情。只有当用户明确要求“改写、拆开、帮我看看这句话”时，它才会展示更多结构。

## 它不会做什么

- 不灌鸡汤，不制造乐观。
- 不用治疗师口吻，不诊断，也不编造经历。
- 不否认错误、责任或真实存在的痛苦。
- 不反复提醒：通常每次对话一次；只有出现另一种明显且重要的重复模式时，最多两次。
- 不保存、记录或上传用户敏感原文。

它只负责改写语言，不是治疗或危机支持。如果文字可能涉及即时危险，每个 Skill 内的安全规则都会暂停普通改写，先处理当下安全。

## 验证

```bash
npm test
```

自动检查会验证四个安装包、保证 Codex 与 Claude Code 同语言版本不发生漂移，并检查隐私、安全、克制和“不灌鸡汤”规则。给模型使用的评测样例在 `evals/cases.jsonl`。

## 自己调整

四个版本都是普通 Markdown。觉得它太爱说话，就收紧 **不要过度触发**；觉得语气不对，就改 **如何回应** 里的例子。事实边界和安全规则建议保留。

## License

MIT。可以拿走、修改，也可以做成你自己的版本。
