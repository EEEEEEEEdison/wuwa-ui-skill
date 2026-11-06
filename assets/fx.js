// WUWA UI Interactive Effects & Canvas Oscilloscope

export function initWutheringEffects() {
  initOscilloscope();
  initThemeToggle();
  initScrambleNumbers();
  initSegments();
}

// 动态 Canvas 示波器波形
function initOscilloscope() {
  const canvas = document.getElementById('oscilloscope');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let phase = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  resize();
  window.addEventListener('resize', resize);

  function draw() {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    ctx.clearRect(0, 0, w, h);

    // 绘制中心参考线
    ctx.strokeStyle = 'rgba(45, 58, 82, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // 绘制示波器网格点
    ctx.fillStyle = 'rgba(54, 226, 213, 0.15)';
    for (let x = 20; x < w; x += 40) {
      ctx.fillRect(x, h / 2 - 2, 2, 4);
    }

    // 主波形：共鸣金
    ctx.strokeStyle = '#E5B842';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(229, 184, 66, 0.6)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let x = 0; x < w; x += 2) {
      const norm = x / w;
      const envelope = Math.sin(Math.PI * norm);
      const y = h / 2 + (Math.sin(norm * 14 + phase) * 28 + Math.sin(norm * 28 + phase * 1.5) * 12) * envelope;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 次波形：冷凝青
    ctx.strokeStyle = '#36E2D5';
    ctx.lineWidth = 1.2;
    ctx.shadowColor = 'rgba(54, 226, 213, 0.4)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let x = 0; x < w; x += 2) {
      const norm = x / w;
      const envelope = Math.sin(Math.PI * norm);
      const y = h / 2 + Math.sin(norm * 10 - phase * 0.8) * 18 * envelope;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.shadowBlur = 0; // 重置光晕
    phase += 0.04;
    animationFrameId = requestAnimationFrame(draw);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  }
}

// 遥测数字乱码落定
function initScrambleNumbers() {
  const nums = document.querySelectorAll('.ww-telemetry-num[data-target]');
  nums.forEach(el => {
    const target = el.dataset.target;
    let iterations = 0;
    const chars = '0123456789%.-';
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = target;
      return;
    }

    const interval = setInterval(() => {
      el.textContent = target.split('').map((letter, index) => {
        if (index < iterations) {
          return target[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      if (iterations >= target.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);
  });
}

// 初始化分段刻度条
function initSegments() {
  const bars = document.querySelectorAll('.ww-segments');
  bars.forEach(bar => {
    const total = parseInt(bar.dataset.total || '20', 10);
    const active = parseInt(bar.dataset.active || '15', 10);
    const type = bar.dataset.type || 'gold';
    bar.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const cell = document.createElement('div');
      cell.className = 'ww-segment-cell' + (i < active ? ` active-${type}` : '');
      bar.appendChild(cell);
    }
  });
}

// 深浅色主题切换
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-ww-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-ww-theme', next);
    toggleBtn.textContent = next === 'light' ? '暗色模式' : '亮色模式';
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initWutheringEffects);
}
