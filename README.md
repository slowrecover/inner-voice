# inner-voice

[中文说明](README.zh-CN.md)

Skills for Codex and Claude Code that notice when a situation turns into a verdict about the person living through it—and quietly put the fact back.

```text
"I'm useless."            →  "I had no income this month."
"I never finish things."  →  "I stopped halfway on this one."
"I'm too lazy for this."  →  "I couldn't get started today."
```

Same event. One version has an exit.

## Choose a skill

| Language | Codex | Claude Code |
| --- | --- | --- |
| English | `skills/codex/inner-voice-en` | `skills/claude-code/inner-voice-en` |
| 中文 | `skills/codex/inner-voice-zh` | `skills/claude-code/inner-voice-zh` |

The Codex and Claude Code editions use the same behavior. They are packaged separately so installation stays obvious on each platform. Install either language or both.

## Install for Codex

macOS / Linux / WSL:

```bash
git clone https://github.com/slowrecover/inner-voice.git
mkdir -p ~/.agents/skills
cp -R inner-voice/skills/codex/inner-voice-en ~/.agents/skills/
cp -R inner-voice/skills/codex/inner-voice-zh ~/.agents/skills/
```

Windows PowerShell:

```powershell
git clone https://github.com/slowrecover/inner-voice.git
New-Item -ItemType Directory -Force "$HOME\.agents\skills" | Out-Null
Copy-Item -Recurse ".\inner-voice\skills\codex\inner-voice-en" "$HOME\.agents\skills\"
Copy-Item -Recurse ".\inner-voice\skills\codex\inner-voice-zh" "$HOME\.agents\skills\"
```

Invoke explicitly with `$inner-voice-en` or `$inner-voice-zh`. Codex can also load a skill automatically when the conversation matches its description.

## Install for Claude Code

macOS / Linux / WSL:

```bash
git clone https://github.com/slowrecover/inner-voice.git
mkdir -p ~/.claude/skills
cp -R inner-voice/skills/claude-code/inner-voice-en ~/.claude/skills/
cp -R inner-voice/skills/claude-code/inner-voice-zh ~/.claude/skills/
```

Windows PowerShell:

```powershell
git clone https://github.com/slowrecover/inner-voice.git
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse ".\inner-voice\skills\claude-code\inner-voice-en" "$HOME\.claude\skills\"
Copy-Item -Recurse ".\inner-voice\skills\claude-code\inner-voice-zh" "$HOME\.claude\skills\"
```

Invoke explicitly with `/inner-voice-en` or `/inner-voice-zh`. Claude Code can also load a skill automatically when the conversation matches its description.

If a newly created skills directory is not detected in an already-open session, open a new session once.

## What it notices

- **Identity verdict:** a setback becomes a trait.
- **Always / never:** one or several events become an unchangeable rule.
- **Catastrophe:** a painful moment becomes the entire future.
- **Mind-reading:** an assumption about another person's thoughts becomes a fact.

During an ordinary conversation, the skill responds with one precise sentence and then returns to the user's actual topic. When the user explicitly asks for a rewrite, it can briefly separate the observable fact from the added conclusion.

## What it does not do

- No cheerleading or manufactured optimism.
- No therapy voice, diagnosis, or invented backstory.
- No denial of mistakes, responsibility, or painful facts.
- No nagging: normally once per conversation, at most twice when a distinct repeated pattern materially matters.
- No saving, logging, or uploading sensitive original text.

This is a language-reframing skill, not therapy or crisis support. The safety rule inside each skill pauses ordinary reframing when immediate danger may be present.

## Validate

```bash
npm test
```

The checks validate all four packages, keep the Codex and Claude Code copies aligned, and verify the privacy, safety, restraint, and non-cheerleading rules. Model-facing evaluation cases live in `evals/cases.jsonl`.

## Tune it

Each edition is plain Markdown. To make it quieter, tighten **Do not over-fire**. To change its voice, edit the examples under **How to respond**. Keep the factual boundary and safety rule intact.

## License

MIT. Take it, change it, and ship your own version.
