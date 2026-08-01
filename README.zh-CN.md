# inner-voice

[English](README.md)

一组可安装到 Codex 和 Claude Code 的 Skill。它会留意：你是不是把一件发生在自己身上的事，悄悄说成了“我就是这样的人”——然后把事实放回句子里。

```text
“我真没用。”          →  “我这个月还没有收入。”
“我从来做不完事情。”  →  “这一次我做到一半停下了。”
“我太懒了。”          →  “我今天没能开始。”
```

同一件事。后一句还有出口。

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

普通对话里，它只用一句准确的话指出来，然后继续处理用户本来在谈的事情。只有当用户明确要求“改写、拆开、帮我看看这句话”时，它才会简短地区分事实和头脑加上的结论。

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
