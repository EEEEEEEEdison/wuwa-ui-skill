// WUWA UI interactions: theme switching and tab selection.
// Classic script (not a module) so pages also work when opened from disk.
// Decoration stays static; numbers on screen must come from real data, never from random text.

function initWutheringEffects() {
  initThemeToggle();
  initTabs();
}

// 深浅色主题切换：按钮带 data-ww-theme-toggle 属性
function initThemeToggle() {
  document.querySelectorAll('[data-ww-theme-toggle]').forEach(button => {
    const label = () => {
      const light = document.documentElement.getAttribute('data-ww-theme') === 'light';
      button.textContent = light ? '切换深色主题' : '切换浅色主题';
    };
    label();
    button.addEventListener('click', () => {
      const light = document.documentElement.getAttribute('data-ww-theme') === 'light';
      document.documentElement.setAttribute('data-ww-theme', light ? 'dark' : 'light');
      label();
    });
  });
}

// 页签：.ww-tab-header 中的 .ww-tab-title，点击后切换 active
function initTabs() {
  document.querySelectorAll('.ww-tab-header').forEach(header => {
    header.addEventListener('click', event => {
      const tab = event.target.closest('.ww-tab-title');
      if (!tab) return;
      header.querySelectorAll('.ww-tab-title').forEach(item => {
        item.classList.toggle('active', item === tab);
        item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
      });
    });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initWutheringEffects);
}
