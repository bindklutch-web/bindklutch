// js/theme.js
function toggleTheme() {
  const html = document.documentElement
  const current = html.getAttribute('data-theme') || 'dark'
  const next = current === 'dark' ? 'corporate' : 'dark'
  html.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
  const btn = document.getElementById('theme-toggle')
  if (btn) btn.innerHTML = next === 'dark' ? '☀️' : '🌙'
}

// Apply saved theme on load
;(function() {
  const saved = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', saved)
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle')
    if (btn) btn.innerHTML = saved === 'dark' ? '☀️' : '🌙'
  })
})()
