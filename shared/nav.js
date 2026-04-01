/* ── PREMAS ONBOARDING SHARED JS ── */

// Scroll progress bar
window.addEventListener('scroll', () => {
  const el = document.getElementById('scroll-bar');
  if (!el) return;
  const doc = document.documentElement;
  const pct = doc.scrollHeight - doc.clientHeight > 0
    ? (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100 : 0;
  el.style.width = pct + '%';
});

// Accordion
function toggleAcc(header) {
  const item = header.closest('.acc-item');
  const isOpen = item.classList.contains('open');
  // close siblings
  item.closest('.accordion')?.querySelectorAll('.acc-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Mark as read
function markDone(moduleId, btnEl) {
  const stored = JSON.parse(localStorage.getItem('premas_onboarding') || '{}');
  stored[moduleId] = true;
  localStorage.setItem('premas_onboarding', JSON.stringify(stored));
  if (btnEl) {
    btnEl.textContent = '✓ Marked Complete';
    btnEl.classList.add('marked');
    btnEl.disabled = true;
  }
}

// On page load — restore button state
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.done-btn');
  const mid = btn?.dataset?.module;
  if (mid) {
    const stored = JSON.parse(localStorage.getItem('premas_onboarding') || '{}');
    if (stored[mid]) {
      btn.textContent = '✓ Marked Complete';
      btn.classList.add('marked');
      btn.disabled = true;
    }
  }
});
