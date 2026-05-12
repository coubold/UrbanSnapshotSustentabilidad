// ======================================================
// URBAN SNAPSHOT v6 · RENDER
// 3 momentos: Diagnóstico → Evolución → Plan de Acción
// ======================================================

(function() {

  // -------- Moment divider --------
  function moment(num, title) {
    return `
      <div class="moment">
        <div class="moment-num">${num}</div>
        <div class="moment-title">${title}</div>
        <div class="moment-line"></div>
      </div>
    `;
  }

  // -------- Executive (compact) --------
  function renderExecutive(m) {
    return `
      <div class="executive">
        <div class="executive-thesis">${m.tesis}</div>
        <div class="executive-reading">${m.ejecutivo}</div>
      </div>
    `;
  }

  // -------- Header + Score --------
  function renderHeader(m) {
    const tagsHtml = m.tags.map(t => `<span class="tag">${t}</span>`).join('') +
      `<span class="tag">${m.area}</span><span class="tag">${m.pop} hab.</span>`;
    const barClass = m.status;

    return `
      <div class="header">
        <div class="header-left">
          <div class="eyebrow">Ayuntamiento analizado</div>
          <h1>${m.name}<br><em>${m.region}</em></h1>
          <div class="tags">${tagsHtml}</div>
        </div>
        <div class="score-block">
          <div class="score-label">Sustainability Score</div>
          <div class="score-value">${m.score}<span class="denom">/100</span></div>
          <div class="score-status ${m.status}">${m.statusText}</div>
          <div class="score-bar"><div class="score-bar-fill ${barClass}" style="width:${m.score}%"></div></div>
          <div class="score-scale"><span>0 Crítico</span><span>50</span><span>100 Óptimo</span></div>
          <div class="score-peers">
            <div class="peer-stat"><div class="k">vs. peers</div><div class="v ${m.peers.vsClass}">${m.peers.vs}</div></div>
            <div class="peer-stat"><div class="k">vs. CCAA</div><div class="v ${m.peers.ccaaClass}">${m.peers.ccaa}</div></div>
            <div class="peer-stat"><div class="k">vs. 3 años</div><div class="v ${m.peers.yrClass}">${m.peers.yr}</div></div>
            <div class="peer-stat"><div class="k">Ranking</div><div class="v">${m.peers.rank}</div></div>
          </div>
        </div>
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

    const rowsHtml = sorted.map(d => {
      const dir = d.delta > 0 ? 'up' : (d.delta < 0 ? 'down' : 'flat');
      const arrow = d.delta > 0 ? '↑' : (d.delta < 0 ? '↓' : '→');
      const pct = Math.abs(d.delta) / maxAbs * 50;
      const sign = d.delta > 0 ? '+' : '';
      return `
        <div class="driver-row">
          <div class="driver-arrow ${dir}">${arrow}</div>
          <div class="driver-name">${d.name}</div>
          <div class="driver-bar-wrap">
            <div class="driver-bar-center"></div>
            <div class="driver-bar ${dir}" style="width:${pct}%"></div>
          </div>
          <div class="driver-value ${dir}">${sign}${d.delta}</div>
        </div>
      `;
    }).join('');

    const net = deltas.reduce((s, d) => s + d.delta, 0);
    const netSign = net > 0 ? '+' : '';

    return `
      <div class="drivers">
        <div class="drivers-title">Drivers del score</div>
        <div class="drivers-sub">Aporte de cada pilar vs. media peer (neto ${netSign}${net} pts)</div>
        <div class="drivers-grid">${rowsHtml}</div>
      </div>
    `;
  }

  // -------- Pillars --------
  function renderPillars(m) {
    const html = m.pillars.map(p => `
      <div class="pillar">
        <svg class="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${window.PILLAR_ICONS[p.icon]}</svg>
        <div class="pillar-name">${p.name}</div>
        <div class="pillar-score">${p.score}<span class="denom">/100</span></div>
        <div class="pillar-bar"><div class="pillar-bar-fill ${p.status}" style="width:${p.score}%"></div></div>
        <div class="pillar-status ${p.status}">${p.statusText}</div>
        <div class="pillar-delta"><strong>${p.delta}</strong> vs 2023 · ${p.vsPeers} vs peers</div>
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head"><h2>Pilares</h2><div class="aux">5 dimensiones ponderadas</div></div>
        <div class="pillars">${html}</div>
      </div>
    `;
  }

  // -------- KPIs --------
  function renderKPIs(m) {
    const html = m.kpis.map(k => `
      <div class="kpi">
        <div class="kpi-head">
          <div class="kpi-name">${k.name}</div>
          <div class="trend ${k.trend}">${k.trendText}</div>
        </div>
        <div class="kpi-value">${k.value}<span class="unit">${k.unit}</span></div>
        <div class="kpi-delta">${k.delta}</div>
        <div class="kpi-interp">${k.interp}</div>
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head"><h2>Indicadores clave</h2><div class="aux">8 señales destacadas</div></div>
        <div class="kpi-grid">${html}</div>
      </div>
    `;
  }

  // -------- Benchmarking --------
  function renderBench(m, id) {
    const peerScores = window.PEER_GROUP.map(pid => ({
      id: pid, name: window.PEER_LABELS[pid], score: window.DATA[pid].score
    })).sort((a, b) => b.score - a.score);

    const rowsHtml = peerScores.map(ps => `
      <div class="bench-row">
        <div class="city-name ${ps.id === id ? 'self' : ''}">${ps.name}</div>
        <div class="bar-track"><div class="bar-fill ${ps.id === id ? 'self' : ''}" style="width:${ps.score}%"></div></div>
        <div class="score-n ${ps.id === id ? 'self' : ''}">${ps.score}</div>
      </div>
    `).join('');
    const avg = (peerScores.reduce((s, p) => s + p.score, 0) / peerScores.length).toFixed(1);

    const histHtml = m.history.map(([yr, sc], i) => `
      <div class="hist-row">
        <div class="yr">${yr}</div>
        <div class="hist-bar-track"><div class="hist-bar-fill ${i === m.history.length - 1 ? 'current' : ''}" style="width:${sc}%">${sc}</div></div>
      </div>
    `).join('');

    const trendColor = m.histTrendClass === 'ok' ? 'var(--ok)' : (m.histTrendClass === 'risk' ? 'var(--risk)' : 'var(--ink)');

    return `
      <div class="section">
        <div class="section-head"><h2>Benchmarking</h2><div class="aux">Peers + histórico</div></div>
        <div class="bench-grid">
          <div class="bench-card">
            <div class="bench-title">Vs. peers</div>
            <div class="bench-sub">Capitales CCAA tamaño medio</div>
            <div class="bench-rows">${rowsHtml}</div>
            <div class="bench-avg-line"><span>Media</span><strong>${avg}</strong></div>
          </div>
          <div class="bench-card">
            <div class="bench-title">Evolución</div>
            <div class="bench-sub">Últimos 5 ciclos</div>
            <div class="histchart">${histHtml}</div>
            <div class="bench-avg-line"><span>Tendencia</span><strong style="color:${trendColor}">${m.histTrend}</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  // -------- Insights (hero + 3 secondary) --------
  function renderInsights(m) {
    const hero = m.insights[0];
    const secondary = m.insights.slice(1);

    return `
      <div class="section">
        <div class="section-head"><h2>Insights</h2><div class="aux">Detección automática</div></div>
        <div class="insight-hero">
          <div class="insight-hero-label">Insight clave</div>
          <div class="insight-hero-title">${hero.title}</div>
          <div class="insight-hero-text">${hero.text}</div>
        </div>
        <div class="insights-secondary">
          ${secondary.map((ins, i) => `
            <div class="insight">
              <div class="insight-num">${String(i + 2).padStart(2, '0')}</div>
              <div class="insight-body">
                <div class="insight-title">${ins.title}</div>
                <div class="insight-text">${ins.text}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // -------- Alerts --------
  function renderAlerts(m) {
    return `
      <div class="section">
        <div class="section-head"><h2>Alertas</h2><div class="aux">${m.alerts.length} riesgos activos</div></div>
        <div class="alerts">
          ${m.alerts.map(a => `
            <div class="alert-row">
              <div><span class="alert-level ${a.level}">${a.level === 'high' ? 'Alta' : a.level === 'med' ? 'Media' : 'Baja'}</span></div>
              <div class="alert-text">${a.text}</div>
              <div class="alert-zone">${a.zone}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // -------- Recs (NO financial sizing) --------
  function renderRecs(m) {
    const html = m.recs.map((r, idx) => `
      <div class="rec prio-${r.prio}">
        <div class="rec-rank">0${idx + 1}</div>
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
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head"><h2>Recomendaciones</h2><div class="aux">Priorizadas por impacto / esfuerzo</div></div>
        <div class="recs">${html}</div>
      </div>
    `;
  }

  // -------- Retos --------
  function renderRetos(m) {
    const html = m.retos.map(r => `
      <div class="reto-card ${r.practice ? 'practice' : ''}">
        <div class="reto-label">${r.practice ? 'Mejor práctica peer' : 'Reto descubierto'}</div>
        <div class="reto-title">${r.title}</div>
        <div class="reto-text">${r.text}</div>
        ${r.peer ? `<div class="reto-peer">${r.peer}</div>` : ''}
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head"><h2>Retos y mejores prácticas</h2><div class="aux">Aprendizajes del benchmarking</div></div>
        <div class="retos-grid">${html}</div>
      </div>
    `;
  }

  // ======== MAIN RENDER — 3 MOMENTS ========
  window.renderSnapshot = function(id) {
    const m = window.DATA[id];
    if (!m) return;

    const content = document.getElementById('content');
    content.innerHTML = [
      // MOMENTO 1: DIAGNÓSTICO
      moment(1, 'Diagnóstico'),
      renderExecutive(m),
      renderHeader(m),
      renderDrivers(m),
      renderPillars(m),
      renderKPIs(m),

      // MOMENTO 2: EVOLUCIÓN
      moment(2, 'Evolución'),
      renderBench(m, id),
      renderInsights(m),
      renderAlerts(m),

      // MOMENTO 3: PLAN DE ACCIÓN
      moment(3, 'Plan de acción'),
      renderRecs(m),
      renderRetos(m),
    ].join('');

    content.classList.remove('fade-in');
    void content.offsetWidth;
    content.classList.add('fade-in');
  };

})();
