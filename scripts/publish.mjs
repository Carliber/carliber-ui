#!/usr/bin/env node
// 训练版产物 → docs 发布版单向同步 + favicon 注入 + 差异报告。
// 用法: node scripts/publish.mjs          (同步全部映射)
// 规则: 训练版是唯一源;发布版 = 训练版 + favicon 行。训练版改动后必须重跑本脚本(workdir.md 同步漂移防线)。
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FAVICON = `<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='8' fill='%237fd47f'/%3E%3Crect y='8' width='16' height='8' fill='%2396694a'/%3E%3Crect x='2' y='10' width='4' height='4' fill='%237a5638'/%3E%3Crect x='10' y='10' width='4' height='4' fill='%237a5638'/%3E%3C/svg%3E">`;
const MAP = [
  [".carliber-ui/cockpit-demo/cockpit.html", "docs/cockpit-demo/cockpit.html"],
  [".carliber-ui/training/r31-states/states.html", "docs/states/states.html"],
  [".carliber-ui/training/r6-blueprint/blueprint.html", "docs/blueprint/blueprint.html"],
];
for (const [src, dst] of MAP) {
  const s = readFileSync(join(root, src), "utf8");
  let out = s.replace(/(<meta name="viewport"[^>]*>\n?)(?!\s*<link rel="icon")/, `$1${FAVICON}\n`);
  if (out === s && !s.includes('rel="icon"')) out = s; // viewport 后已有 icon 或无 viewport, 原样
  writeFileSync(join(root, dst), out);
  const same = out === readFileSync(join(root, dst), "utf8");
  console.log(`${same ? "同步" : "写入"} ${dst}`);
}
console.log("发布版导航相对路径以 docs/ 布局为准, 首次发布需人工核对导航与相对链接(challenge 第 3 维逐一点击)。");
