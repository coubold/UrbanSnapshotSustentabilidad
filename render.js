// ======================================================
// URBAN SNAPSHOT v6 · RENDER (tabbed)
// Hero + Executive always visible, 3 tabs below
// ======================================================

(function() {

  // -------- Hero (name + score inline) --------
  function renderHero(m) {
    const tagsHtml = m.tags.map(t => `<span class="tag">${t}</span>`).join('') +
      `<span class="tag">${m.area}</span><span class="tag">${m.pop} hab.</span>`;

    return `
      <div class="hero">
        <div class="hero-left">
          <div class="eyebrow">Ayuntamiento</div>
          <h1>${m.name}<br><em>${m.region}</em></h1>
          <div class="tags">${tagsHtml}</div>
        </div>
        <div class="score-mini">
          <div class="score-mini-label">Sustainability Score</div>
          <div class="score-mini-value">${m.score}<span class="denom">/100</span></div>
          <div class="score-mini-status ${m.status}">${m.statusText}</div>
          <div class="score-mini-peers">
            <div class="peer-stat"><div class="k">vs peers</div><div class="v ${m.peers.vsClass}">${m.peers.vs}</div></div>
            <div class="peer-stat"><div class="k">vs CCAA</div><div class="v ${m.peers.ccaaClass}">${m.peers.ccaa}</div></div>
            <div class="peer-stat"><div class="k">vs 3 años</div><div class="v ${m.peers.yrClass}">${m.peers.yr}</div></div>
            <div class="peer-stat"><div class="k">Ranking</div><div class="v">${m.peers.rank}</div></div>
          </div>
        </div>
      </div>
    `;
  }

  // -------- Executive (thin strip) --------
  function renderExecutive(m) {
    return `
      <div class="executive">
        <div class="executive-thesis">${m.tesis}</div>
        <div class="executive-reading">${m.ejecutivo}</div>
      </div>
    `;
  }

  // -------- Drivers --------
  function renderDrivers(m) {
    const deltas = m.pillars.map(p => ({
      name: p.name,
      delta: parseInt(p.vsPeers.replace('+','').replace('−','-')) || 0
    }));
    const maxAbs = Math.max(...deltas.map(d => Math.abs(d.delta))) || 1;
    const sorted = [...deltas].sort((a, b) => {
      if (a.delta >= 0 && b.delta < 0) return -1;
      if (a.delta < 0 && b.delta >= 0) return 1;
      return a.delta >= 0 ? b.delta - a.delta : a.delta - b.delta;
    });
    const net = deltas.reduce((s, d) => s + d.delta, 0);
    const netSign = net > 0 ? '+' : '';

    return `
      <div class="drivers">
        <div class="drivers-title">Drivers del score</div>
        <div class="drivers-sub">Aporte por pilar vs media peer (neto <strong>${netSign}${net}</strong>)</div>
        <div class="drivers-grid">
          ${sorted.map(d => {
            const dir = d.delta > 0 ? 'up' : (d.delta < 0 ? 'down' : 'flat');
            const arrow = d.delta > 0 ? '↑' : (d.delta < 0 ? '↓' : '→');
            const pct = Math.abs(d.delta) / maxAbs * 50;
            const sign = d.delta > 0 ? '+' : '';
            return `<div class="driver-row">
              <div class="driver-arrow ${dir}">${arrow}</div>
              <div class="driver-name">${d.name}</div>
              <div class="driver-bar-wrap"><div class="driver-bar-center"></div><div class="driver-bar ${dir}" style="width:${pct}%"></div></div>
              <div class="driver-value ${dir}">${sign}${d.delta}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  // -------- Pillars --------
  function renderPillars(m) {
    return `
      <div class="section">
        <div class="section-head"><h2>Pilares</h2><div class="aux">5 dimensiones</div></div>
        <div class="pillars">
          ${m.pillars.map(p => `
            <div class="pillar">
              <svg class="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${window.PILLAR_ICONS[p.icon]}</svg>
              <div class="pillar-name">${p.name}</div>
              <div class="pillar-score">${p.score}<span class="denom">/100</span></div>
              <div class="pillar-bar"><div class="pillar-bar-fill ${p.status}" style="width:${p.score}%"></div></div>
              <div class="pillar-status ${p.status}">${p.statusText}</div>
              <div class="pillar-delta"><strong>${p.delta}</strong> vs 2023 · ${p.vsPeers} vs peers</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // -------- KPIs --------
  function renderKPIs(m) {
    return `
      <div class="section">
        <div class="section-head"><h2>Indicadores clave</h2><div class="aux">8 señales</div></div>
        <div class="kpi-grid">
          ${m.kpis.map(k => `
            <div class="kpi">
              <div class="kpi-head"><div class="kpi-name">${k.name}</div><div class="trend ${k.trend}">${k.trendText}</div></div>
              <div class="kpi-value">${k.value}<span class="unit">${k.unit}</span></div>
              <div class="kpi-delta">${k.delta}</div>
              <div class="kpi-interp">${k.interp}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // -------- Bench --------
  function renderBench(m, id) {
    const peerScores = window.PEER_GROUP.map(pid => ({ id: pid, name: window.PEER_LABELS[pid], score: window.DATA[pid].score })).sort((a, b) => b.score - a.score);
    const avg = (peerScores.reduce((s, p) => s + p.score, 0) / peerScores.length).toFixed(1);
    const trendColor = m.histTrendClass === 'ok' ? 'var(--ok)' : (m.histTrendClass === 'risk' ? 'var(--risk)' : 'var(--ink)');

    return `
      <div class="section">
        <div class="section-head"><h2>Benchmarking</h2><div class="aux">Peers + histórico</div></div>
        <div class="bench-grid">
          <div class="bench-card">
            <div class="bench-title">Vs. peers</div><div class="bench-sub">Capitales CCAA</div>
            <div class="bench-rows">
              ${peerScores.map(ps => `<div class="bench-row">
                <div class="city-name ${ps.id === id ? 'self' : ''}">${ps.name}</div>
                <div class="bar-track"><div class="bar-fill ${ps.id === id ? 'self' : ''}" style="width:${ps.score}%"></div></div>
                <div class="score-n ${ps.id === id ? 'self' : ''}">${ps.score}</div>
              </div>`).join('')}
            </div>
            <div class="bench-avg-line"><span>Media</span><strong>${avg}</strong></div>
          </div>
          <div class="bench-card">
            <div class="bench-title">Evolución</div><div class="bench-sub">5 ciclos</div>
            <div class="histchart">
              ${m.history.map(([yr, sc], i) => `<div class="hist-row">
                <div class="yr">${yr}</div>
                <div class="hist-bar-track"><div class="hist-bar-fill ${i === m.history.length - 1 ? 'current' : ''}" style="width:${sc}%">${sc}</div></div>
              </div>`).join('')}
            </div>
            <div class="bench-avg-line"><span>Tendencia</span><strong style="color:${trendColor}">${m.histTrend}</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  // -------- Insights --------
  function renderInsights(m) {
    const hero = m.insights[0], secondary = m.insights.slice(1);
    return `
      <div class="section">
        <div class="section-head"><h2>Insights</h2><div class="aux">Detección automática</div></div>
        <div class="insight-hero">
          <div class="insight-hero-label">Insight clave</div>
          <div class="insight-hero-title">${hero.title}</div>
          <div class="insight-hero-text">${hero.text}</div>
        </div>
        <div class="insights-secondary">
          ${secondary.map((ins, i) => `<div class="insight">
            <div class="insight-num">${String(i + 2).padStart(2, '0')}</div>
            <div class="insight-body"><div class="insight-title">${ins.title}</div><div class="insight-text">${ins.text}</div></div>
          </div>`).join('')}
        </div>
      </div>
    `;
  }

  // -------- Alerts --------
  function renderAlerts(m) {
    return `
      <div class="section">
        <div class="section-head"><h2>Alertas</h2><div class="aux">${m.alerts.length} activas</div></div>
        <div class="alerts">
          ${m.alerts.map(a => `<div class="alert-row">
            <div><span class="alert-level ${a.level}">${a.level === 'high' ? 'Alta' : a.level === 'med' ? 'Media' : 'Baja'}</span></div>
            <div class="alert-text">${a.text}</div>
            <div class="alert-zone">${a.zone}</div>
          </div>`).join('')}
        </div>
      </div>
    `;
  }

  // -------- Recs --------
  function renderRecs(m) {
    return `
      <div class="section">
        <div class="section-head"><h2>Recomendaciones</h2><div class="aux">Priorizadas</div></div>
        <div class="recs">
          ${m.recs.map((r, i) => `<div class="rec prio-${r.prio}">
            <div class="rec-rank">0${i + 1}</div>
            <div class="rec-body">
              <div class="rec-priority prio-${r.prio}">${r.prioText}</div>
              <div class="rec-title">${r.title}</div>
              <div class="rec-desc">${r.desc}</div>
              <div class="rec-meta">
                <div class="rec-meta-item"><span class="k">Horizonte</span><span class="v">${r.h}</span></div>
                <div class="rec-meta-item"><span class="k">Esfuerzo</span><span class="v">${r.e}</span></div>
                <div class="rec-meta-item"><span class="k">Impacto</span><span class="v">${r.i}</span></div>
                <div class="rec-meta-item"><span class="k">Pilares</span><span class="v">${r.p}</span></div>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    `;
  }

  // -------- Retos --------
  function renderRetos(m) {
    return `
      <div class="section">
        <div class="section-head"><h2>Retos y mejores prácticas</h2><div class="aux">Benchmarking</div></div>
        <div class="retos-grid">
          ${m.retos.map(r => `<div class="reto-card ${r.practice ? 'practice' : ''}">
            <div class="reto-label">${r.practice ? 'Mejor práctica peer' : 'Reto descubierto'}</div>
            <div class="reto-title">${r.title}</div>
            <div class="reto-text">${r.text}</div>
            ${r.peer ? `<div class="reto-peer">${r.peer}</div>` : ''}
          </div>`).join('')}
        </div>
      </div>
    `;
  }

  // ======== MAIN RENDER ========
  window.renderSnapshot = function(id) {
    const m = window.DATA[id];
    if (!m) return;

    // Build context string for advisor
    const ctx = [
      `Municipio: ${m.name} (${m.region})`,
      `Score: ${m.score}/100 — ${m.statusText}`,
      `Pilares: ${m.pillars.map(p => p.name + ' ' + p.score + ' (' + p.vsPeers + ' vs peers)').join(' · ')}`,
      `Tendencia: ${m.histTrend} en 5 años`,
      `Tesis: ${m.tesis}`,
    ].join('\n');

    // Financial data (from data.js, not rendered in main UI)
    const fin = m.financial || {};
    const dec = m.decision || {};

    document.getElementById('content').innerHTML = `
      ${renderHero(m)}
      ${renderExecutive(m)}

      <div class="action-bar">
        <button class="action-btn" onclick="window.print()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Exportar PDF
        </button>
        <button class="action-btn primary" id="btnAdvisor">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          Analizar con Advisor BBVA
        </button>
      </div>

      <div class="tabs">
        <div class="tab active" data-tab="diagnostico"><span class="tab-num">1</span> Diagnóstico</div>
        <div class="tab" data-tab="evolucion"><span class="tab-num">2</span> Evolución</div>
        <div class="tab" data-tab="accion"><span class="tab-num">3</span> Plan de acción</div>
      </div>

      <div class="tab-content active" id="tab-diagnostico">
        ${renderDrivers(m)}
        ${renderPillars(m)}
        ${renderKPIs(m)}
      </div>

      <div class="tab-content" id="tab-evolucion">
        ${renderBench(m, id)}
        ${renderInsights(m)}
        ${renderAlerts(m)}
      </div>

      <div class="tab-content" id="tab-accion">
        ${renderRecs(m)}
        ${renderRetos(m)}
      </div>

      <!-- ADVISOR MODAL -->
      <div class="modal-overlay" id="advisorModal">
        <div class="modal">
          <div class="modal-header">
            <div class="modal-header-title">Advisor BBVA · Análisis financiero</div>
            <button class="modal-close" id="modalClose">&times;</button>
          </div>
          <div class="modal-body">
            <div class="modal-section-label">Contexto enviado desde Urban Snapshot</div>
            <div class="modal-context">${ctx}</div>

            <div class="modal-loading" id="advisorLoading">
              <div class="modal-spinner"></div>
              <div>Procesando con Advisor BBVA...</div>
            </div>

            <div class="modal-result" id="advisorResult">
              <div class="modal-section-label">Respuesta del Advisor</div>

              ${fin.credit_risk ? `
              <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:14px;">
                <div class="modal-result-card" style="border-left-color:${fin.credit_risk_class === 'ok' ? 'var(--ok)' : (fin.credit_risk_class === 'risk' ? 'var(--risk)' : 'var(--warn)')}">
                  <div style="font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Riesgo crediticio</div>
                  <div style="font-family:'Fraunces',serif;font-size:18px;color:var(--ink);font-weight:500">${fin.credit_risk}</div>
                  <div style="font-size:9.5px;color:var(--muted);margin-top:3px">${fin.credit_risk_note}</div>
                </div>
                <div class="modal-result-card" style="border-left-color:${fin.esg_class === 'ok' ? 'var(--ok)' : 'var(--warn)'}">
                  <div style="font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Elegibilidad ESG</div>
                  <div style="font-family:'Fraunces',serif;font-size:18px;color:var(--ink);font-weight:500">${fin.esg_eligibility}</div>
                  <div style="font-size:9.5px;color:var(--muted);margin-top:3px">${fin.esg_note}</div>
                </div>
                <div class="modal-result-card" style="border-left-color:${fin.green_class === 'ok' ? 'var(--ok)' : 'var(--warn)'}">
                  <div style="font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Financiación verde</div>
                  <div style="font-family:'Fraunces',serif;font-size:18px;color:var(--ink);font-weight:500">${fin.green_finance}</div>
                  <div style="font-size:9.5px;color:var(--muted);margin-top:3px">${fin.green_note}</div>
                </div>
                <div class="modal-result-card" style="border-left-color:var(--bbva-blue)">
                  <div style="font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:4px">Ajuste de tasa</div>
                  <div style="font-family:'Fraunces',serif;font-size:18px;color:var(--ink);font-weight:500">${fin.rate_adjustment}</div>
                  <div style="font-size:9.5px;color:var(--muted);margin-top:3px">${fin.rate_note}</div>
                </div>
              </div>
              ` : ''}

              ${dec.headline ? `
              <div class="modal-result-card">
                <div style="font-size:8px;letter-spacing:0.12em;text-transform:uppercase;color:var(--bbva-blue);font-weight:700;margin-bottom:8px">Decisión recomendada</div>
                <div class="modal-result-title">${dec.headline}</div>
                <div class="modal-result-text">${dec.rationale}</div>
                <div class="modal-result-meta">
                  <div class="modal-result-meta-item"><span class="k">Target</span><span class="v">${dec.target}</span></div>
                  <div class="modal-result-meta-item"><span class="k">Producto</span><span class="v">${dec.product}</span></div>
                  <div class="modal-result-meta-item"><span class="k">Ticket</span><span class="v">${dec.ticket}</span></div>
                  <div class="modal-result-meta-item"><span class="k">Horizonte</span><span class="v">${dec.horizon}</span></div>
                </div>
              </div>
              ` : ''}

              <div class="modal-disclaimer">
                Análisis generado por el Advisor interno de BBVA a partir del contexto provisto por Urban Snapshot (Bold). 
                Estimación orientativa sujeta a validación por comité de crédito. Bold provee el diagnóstico; BBVA produce la recomendación financiera.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
      });
    });

    // Advisor modal
    const modal = document.getElementById('advisorModal');
    const loading = document.getElementById('advisorLoading');
    const result = document.getElementById('advisorResult');

    document.getElementById('btnAdvisor').addEventListener('click', () => {
      modal.classList.add('open');
      loading.classList.add('visible');
      result.classList.remove('visible');
      setTimeout(() => {
        loading.classList.remove('visible');
        result.classList.add('visible');
      }, 2200);
    });

    document.getElementById('modalClose').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  };

})();
