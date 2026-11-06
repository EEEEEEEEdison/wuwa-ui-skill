// Generates acoustic resonance waveforms (wave-a.svg and wave-b.svg)
// Based on damped harmonic superposition and soundwave envelope equations.
import { writeFileSync } from 'node:fs';

function generateHarmonicPath(w, h, harmonics, pointsCount = 120) {
  const points = [];
  const midY = h / 2;
  const dx = w / (pointsCount - 1);

  for (let i = 0; i < pointsCount; i++) {
    const x = i * dx;
    const normX = x / w; // 0 to 1
    // Damped envelope: high in middle or fading along edges
    const envelope = Math.sin(Math.PI * normX) * (0.8 + 0.2 * Math.cos(2 * Math.PI * normX));
    
    let waveOffset = 0;
    for (const hItem of harmonics) {
      waveOffset += Math.sin(normX * hItem.freq * Math.PI * 2 + hItem.phase) * hItem.amp;
    }

    const y = midY + waveOffset * envelope;
    points.push([x, y]);
  }

  // Build SVG path with smooth quadratic bezier curves
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i][0] + points[i + 1][0]) / 2;
    const yc = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q ${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)}, ${xc.toFixed(1)} ${yc.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

function buildWaveSvg(file, w, h, waveConfigs) {
  let paths = '';
  for (const cfg of waveConfigs) {
    const d = generateHarmonicPath(w, h, cfg.harmonics, cfg.points);
    paths += `<path d="${d}" stroke="${cfg.color}" stroke-width="${cfg.width}" opacity="${cfg.opacity}" fill="none"/>\n`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none">
<defs>
  <linearGradient id="fadeEdge" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
    <stop offset="15%" stop-color="#fff" stop-opacity="1"/>
    <stop offset="85%" stop-color="#fff" stop-opacity="1"/>
    <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="edgeMask">
    <rect width="${w}" height="${h}" fill="url(#fadeEdge)"/>
  </mask>
</defs>
<g mask="url(#edgeMask)">
${paths}</g>
</svg>`;

  writeFileSync(new URL(`./${file}`, import.meta.url), svg);
  console.log(`Generated ${file} (${(svg.length / 1024).toFixed(1)} KB)`);
}

// Wave A: Primary Resonance Frequency (Spectro Gold & Acoustic Slate)
buildWaveSvg('wave-a.svg', 1000, 300, [
  {
    harmonics: [{ freq: 2, amp: 55, phase: 0 }, { freq: 5, amp: 22, phase: 1.2 }, { freq: 11, amp: 8, phase: 0.5 }],
    color: '#E5B842', width: 1.5, opacity: 0.45, points: 150
  },
  {
    harmonics: [{ freq: 2, amp: 48, phase: 0.2 }, { freq: 4, amp: 18, phase: 1.8 }],
    color: '#F0C048', width: 1.0, opacity: 0.3, points: 120
  },
  {
    harmonics: [{ freq: 3, amp: 65, phase: 2.1 }, { freq: 7, amp: 15, phase: 0.8 }],
    color: '#8C96A6', width: 0.8, opacity: 0.25, points: 120
  }
]);

// Wave B: Secondary Glacio Frequency (Glacial Cyan & Harmonic Pulse)
buildWaveSvg('wave-b.svg', 800, 240, [
  {
    harmonics: [{ freq: 3, amp: 42, phase: 0 }, { freq: 6, amp: 16, phase: 1.5 }, { freq: 13, amp: 6, phase: 2.0 }],
    color: '#36E2D5', width: 1.2, opacity: 0.5, points: 140
  },
  {
    harmonics: [{ freq: 1.5, amp: 35, phase: 0.8 }, { freq: 4.5, amp: 12, phase: 2.4 }],
    color: '#8C96A6', width: 0.8, opacity: 0.2, points: 100
  }
]);
