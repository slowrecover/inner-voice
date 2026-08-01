import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillPaths = {
  codexEn: "skills/codex/inner-voice-en/SKILL.md",
  codexZh: "skills/codex/inner-voice-zh/SKILL.md",
  claudeEn: "skills/claude-code/inner-voice-en/SKILL.md",
  claudeZh: "skills/claude-code/inner-voice-zh/SKILL.md",
};

async function text(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function frontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, "SKILL.md must start with YAML frontmatter");
  const entries = match[1]
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const index = line.indexOf(":");
      assert.ok(index > 0, `Invalid frontmatter line: ${line}`);
      return [line.slice(0, index), line.slice(index + 1).trim()];
    });
  return Object.fromEntries(entries);
}

test("all four installable skills have focused standard frontmatter", async () => {
  for (const [key, relativePath] of Object.entries(skillPaths)) {
    const markdown = await text(relativePath);
    const meta = frontmatter(markdown);
    const expectedName = key.endsWith("En") ? "inner-voice-en" : "inner-voice-zh";
    assert.deepEqual(Object.keys(meta).sort(), ["description", "name"]);
    assert.equal(meta.name, expectedName);
    assert.ok(meta.description.length >= 80, `${key} description is too vague`);
    assert.ok(meta.description.length < 1536, `${key} description exceeds Claude Code discovery budget`);
    assert.ok(markdown.split("\n").length < 500, `${key} exceeds the recommended SKILL.md size`);
  }
});

test("same-language Codex and Claude Code instructions cannot drift", async () => {
  assert.equal(await text(skillPaths.codexEn), await text(skillPaths.claudeEn));
  assert.equal(await text(skillPaths.codexZh), await text(skillPaths.claudeZh));
});

test("English skill keeps restraint, factual accuracy, privacy, and safety", async () => {
  const markdown = await text(skillPaths.codexEn);
  for (const phrase of [
    "once per conversation",
    "directly observable details",
    "Do not correct ordinary negative facts",
    "Accuracy is not absolution",
    "Never use generic reassurance",
    "immediate self-harm",
    "Do not save, log, upload",
  ]) assert.match(markdown, new RegExp(phrase, "i"));
});

test("Chinese skill keeps restraint, factual accuracy, privacy, and safety", async () => {
  const markdown = await text(skillPaths.codexZh);
  for (const phrase of [
    "每次对话通常触发一次",
    "可以直接观察",
    "不要纠正",
    "准确不等于开脱",
    "不要使用",
    "即时的自伤",
    "不要保存、记录、上传",
  ]) assert.match(markdown, new RegExp(phrase));
});

test("Codex packages include current UI metadata", async () => {
  const en = await text("skills/codex/inner-voice-en/agents/openai.yaml");
  const zh = await text("skills/codex/inner-voice-zh/agents/openai.yaml");
  assert.match(en, /display_name: "Inner Voice — English"/);
  assert.match(en, /\$inner-voice-en/);
  assert.match(zh, /display_name: "Inner Voice — 中文"/);
  assert.match(zh, /\$inner-voice-zh/);
});

test("READMEs document current Codex and Claude Code install locations", async () => {
  for (const relativePath of ["README.md", "README.zh-CN.md"]) {
    const readme = await text(relativePath);
    assert.match(readme, /~\/\.agents\/skills/);
    assert.match(readme, /~\/\.claude\/skills/);
    assert.doesNotMatch(readme, /~\/\.codex\/skills/);
  }
});

test("evaluation cases cover triggers, non-triggers, both languages, and safety", async () => {
  const cases = (await text("evals/cases.jsonl"))
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  assert.equal(cases.length, 9);
  assert.ok(cases.some((item) => item.language === "en" && item.mode === "no-fire"));
  assert.ok(cases.some((item) => item.language === "zh" && item.mode === "no-fire"));
  assert.ok(cases.some((item) => item.mode === "safety"));
  assert.ok(cases.every((item) => item.input && item.must && Number.isInteger(item.max_notices)));
});
