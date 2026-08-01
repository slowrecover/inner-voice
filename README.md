# inner-voice

[中文说明](README.zh-CN.md)

Skills for Codex and Claude Code that catch the moment a situation becomes a verdict about you.

```text
You: "I haven't made money yet. I'm worthless."

Inner Voice:
"The subject changed: 'I haven't made money yet' became 'I'm worthless.'
Put the fact back: I haven't made money yet."
```

**Not reassurance.** It names the linguistic shift once, puts the observable fact back, and gets out of the way.

Codex + Claude Code · English + 中文 · No tracking or logging · No therapy voice · No forced positivity

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
- **Comparison verdict:** someone else's visible progress becomes evidence that you are failing.
- **Feeling as proof:** feeling stuck or incapable becomes proof that you are.
- **Hidden rules:** an assumed `should` or `must` timeline becomes a judgment about you.

During an ordinary conversation, the skill uses one compact intervention: it names the exact shift, puts the fact back, and then returns to the user's actual topic. When the user explicitly asks for a rewrite, it can briefly show more structure.

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
