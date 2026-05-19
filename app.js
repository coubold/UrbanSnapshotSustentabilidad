// ======================================================
// URBAN SNAPSHOT v7 · APP
// Starts with portfolio view, selector navigates in detail
// ======================================================

(function() {

  const selector = document.getElementById('selector');
  const selectorInput = document.getElementById('selectorInput');
  const selectorDropdown = document.getElementById('selectorDropdown');

  function statusClass(s) { return s === 'ok' ? 'ok' : (s === 'risk' ? 'risk' : 'warn'); }

  function renderDropdown() {
    const items = Object.entries(window.DATA).sort((a, b) => b[1].score - a[1].score);
    selectorDropdown.innerHTML = items.map(([id, m]) => `
      <div class="selector-item" data-id="${id}">
        <div>
          <div class="selector-item-name">${m.name}</div>
          <div class="selector-item-region">${m.region} · ${m.pop} hab.</div>
        </div>
        <span class="selector-item-dot ${statusClass(m.status)}"></span>
        <div class="selector-item-score">${m.score}</div>
      </div>
    `).join('');

    selectorDropdown.querySelectorAll('.selector-item').forEach(el => {
      el.addEventListener('click', () => {
        selector.classList.remove('open');
        window.openDetail(el.dataset.id);
      });
    });
  }

  selectorInput.addEventListener('click', () => {
    selector.classList.toggle('open');
    renderDropdown();
  });

  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) selector.classList.remove('open');
  });

  // Init: show portfolio
  window.renderPortfolio();

})();
