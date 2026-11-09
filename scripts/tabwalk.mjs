import { chromium } from '/Users/tongxl/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
const EXE = '/Users/tongxl/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const pages = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: EXE });

for (const f of pages) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('file://' + f, { waitUntil: 'networkidle' });
  const seq = [];
  let prev = null, stuck = 0;
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    const cur = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return { tag: 'BODY', note: '焦点逃逸或无可聚焦元素' };
      const s = getComputedStyle(a);
      // 焦点可见性近似: outline/box-shadow/border 变化无法直接比对, 检查 outline 是否 none 且无其他标注
      const r = a.getBoundingClientRect();
      return {
        tag: a.tagName.toLowerCase() + (a.id ? '#' + a.id : '') + (a.className && typeof a.className === 'string' ? '.' + a.className.split(' ')[0] : ''),
        text: (a.textContent || a.value || a.placeholder || '').trim().slice(0, 18),
        outline: s.outlineStyle === 'none' ? 'no-outline' : 'outline',
        onScreen: r.width > 0 && r.bottom > 0 && r.top < innerHeight,
      };
    });
    const key = JSON.stringify(cur);
    if (key === prev) stuck++; else stuck = 0;
    prev = key;
    seq.push({ i: i + 1, ...cur });
    if (stuck >= 3) { seq.push({ loop: 'Tab 序列停止推进(3 次同元素)' }); break; }
  }
  const problems = [];
  if (seq.some(s => s.note)) problems.push('焦点逃逸到 BODY(无可聚焦元素或 Tab 顺序断裂)');
  if (seq.some(s => s.outline === 'no-outline')) problems.push('存在无可见焦点指示的聚焦元素');
  const tags = seq.filter(s => s.tag).map(s => s.tag);
  const dup = tags.some((t, i) => i > 0 && tags[i - 1] === t && t !== 'BODY');
  console.log('\n===', f.split('/').pop());
  console.log('Tab 序列:', seq.filter(s => s.tag).map(s => `${s.i}.${s.tag}[${s.text || ''}](${s.outline})`).join(' → ').slice(0, 500));
  console.log(problems.length ? '✘ ' + problems.join('; ') : '✔ 键盘流正常');
  await page.close();
}
await browser.close();
