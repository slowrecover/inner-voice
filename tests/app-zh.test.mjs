import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = path.join(root, "app/zh");

async function read(relativePath, encoding = "utf8") {
  return readFile(path.join(appRoot, relativePath), encoding);
}

async function classifier() {
  const html = await read("index.html");
  const match = html.match(/<script id="classifier">([\s\S]*?)<\/script>/);
  assert.ok(match, "classifier must remain inline and testable");
  const context = vm.createContext({ window: {} });
  vm.runInContext(match[1], context);
  return context.window.InnerVoice.classifyInnerTalk;
}

test("Chinese classifier recognizes the four first-release patterns", async () => {
  const classify = await classifier();
  assert.equal(classify("我就是一个没用的人").type, "identity");
  assert.equal(classify("我每次都把事情搞砸").type, "absolute");
  assert.equal(classify("现在全完了").type, "catastrophe");
  assert.equal(classify("别人肯定都看不起我").type, "mind-reading");
});

test("a plain feeling is not treated as a distorted fact", async () => {
  const classify = await classifier();
  assert.equal(classify("我现在很难过").type, "feeling");
  assert.equal(classify("这几天一直很焦虑").type, "feeling");
});

test("unknown text is labeled as a limited match, not praised or declared correct", async () => {
  const classify = await classifier();
  const result = classify("这次没有通过考试");
  assert.equal(result.type, "unknown");
  assert.match(result.prompt, /超出了这版工具能识别的范围/);
});

test("safety language pauses ordinary reframing", async () => {
  const classify = await classifier();
  assert.equal(classify("我不想活了").type, "safety");
  assert.equal(classify("我可能会伤害自己").type, "safety");
});

test("the app keeps CSS and JavaScript inline without external libraries", async () => {
  const html = await read("index.html");
  assert.match(html, /<style>[\s\S]+<\/style>/);
  assert.match(html, /<script id="classifier">[\s\S]+<\/script>/);
  assert.doesNotMatch(html, /<script[^>]+src=/);
  assert.doesNotMatch(html, /https?:\/\//);
});

test("the app does not persist or transmit user text", async () => {
  const files = await Promise.all([read("index.html"), read("sw.js")]);
  const source = files.join("\n");
  for (const forbidden of [
    "localStorage",
    "sessionStorage",
    "indexedDB",
    "document.cookie",
    "XMLHttpRequest",
    "sendBeacon",
    "WebSocket",
  ]) assert.doesNotMatch(source, new RegExp(forbidden, "i"));
  assert.doesNotMatch(source, /<form\b/i);
  assert.doesNotMatch(source, /new URLSearchParams/i);
});

test("privacy, self-authored fact, and non-cheerleading copy stay visible", async () => {
  const html = await read("index.html");
  assert.match(html, /只写能被看到、听到或数出来的内容/);
  assert.match(html, /两句说的是同一件事。只有一句有下一步。/);
  assert.match(html, /不登录，不上传，不保存/);
  assert.match(html, /刷新或关闭后即消失/);
  assert.doesNotMatch(html, /(加油|你很棒|一切都会好起来|你值得)/);
});

test("manifest configures a standalone Chinese home-screen app", async () => {
  const manifest = JSON.parse(await read("manifest.json"));
  assert.equal(manifest.lang, "zh-CN");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.short_name, "内心话还原");
  assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);
});

test("service worker caches only the fixed app shell", async () => {
  const sw = await read("sw.js");
  assert.match(sw, /cache\.addAll\(APP_SHELL\)/);
  assert.match(sw, /request\.method !== "GET"/);
  assert.match(sw, /url\.origin !== self\.location\.origin/);
  assert.doesNotMatch(sw, /postMessage|request\.text|request\.json|request\.body/i);
});

test("PNG home-screen icons have the declared dimensions", async () => {
  for (const size of [192, 512]) {
    const png = await read(`icons/icon-${size}.png`, null);
    assert.equal(png.toString("ascii", 1, 4), "PNG");
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
});
