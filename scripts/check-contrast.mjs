// Checks the WCAG contrast of the text pairs listed in assets/tokens.json, for both themes.
// Usage: node scripts/check-contrast.mjs   (exit code 1 when a pair is below the text minimum)
import { readFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('../assets/tokens.json', import.meta.url), 'utf8'));

function luminance(hex) {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map(i => parseInt(value.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

let failed = 0;
for (const [theme, colors] of Object.entries(tokens.color)) {
  for (const [text, background, size] of tokens.contrast.pairs) {
    // "large" marks text of 24px and above (page titles), which WCAG allows at 3:1.
    const minimum = size === 'large' ? tokens.contrast.largeText : tokens.contrast.text;
    const fg = colors[text], bg = colors[background];
    if (!/^#[0-9a-f]{6}$/i.test(fg) || !/^#[0-9a-f]{6}$/i.test(bg)) {
      console.log(`${theme}  ${text} on ${background}: skipped (not an opaque hex color)`);
      continue;
    }
    const value = ratio(fg, bg);
    const pass = value >= minimum;
    if (!pass) failed++;
    console.log(`${theme}  ${text} on ${background}: ${value.toFixed(2)}:1 ${pass ? 'ok' : 'BELOW ' + minimum}`);
  }
}
process.exit(failed ? 1 : 0);
