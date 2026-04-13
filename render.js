// ======================================================
// TERRITORY SNAPSHOT · RENDER
// ======================================================

(function() {

  // -------- Section: Executive (NEW) --------
  function renderExecutive(m) {
    return `
      <div class="executive">
        <div class="executive-label">Lectura ejecutiva</div>
        <div class="executive-thesis">${m.tesis}</div>
        <div class="executive-divider"></div>
        <div class="executive-reading">${m.ejecutivo}</div>
      </div>
    `;
  }

  // -------- Section: Header --------
  function renderHeader(m) {
    const tagsHtml = m.tags.map(t => `<span class="tag">${t}</span>`).join('') +
      `<span class="tag">${m.area}</span><span class="tag">${m.pop} hab.</span>`;

    const scoreBarClass = m.status === 'risk' ? 'risk' : (m.status === 'ok' ? 'ok' : '');

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
          <div class="score-bar"><div class="score-bar-fill ${scoreBarClass}" style="width:${m.score}%"></div></div>
          <div class="score-scale"><span>0 Crítico</span><span>50</span><span>100 Óptimo</span></div>
          <div class="score-peers">
            <div class="peer-stat"><div class="k">vs. peers</div><div class="v ${m.peers.vsClass}">${m.peers.vs}</div></div>
            <div class="peer-stat"><div class="k">vs. media CCAA</div><div class="v ${m.peers.ccaaClass}">${m.peers.ccaa}</div></div>
            <div class="peer-stat"><div class="k">vs. 3 años</div><div class="v ${m.peers.yrClass}">${m.peers.yr}</div></div>
            <div class="peer-stat"><div class="k">Ranking peers</div><div class="v">${m.peers.rank}</div></div>
          </div>
        </div>
      </div>
    `;
  }

  // -------- Section: Drivers (NEW) --------
  function renderDrivers(m) {
    // Calculate max absolute delta for bar scaling
    const deltas = m.pillars.map(p => ({
      name: p.name,
      delta: parseInt(p.vsPeers.replace('+','').replace('−','-')) || 0
    }));
    const maxAbs = Math.max(...deltas.map(d => Math.abs(d.delta))) || 1;

    // Sort: positives desc, then negatives desc (by absolute)
    const sorted = [...deltas].sort((a, b) => {
      if (a.delta >= 0 && b.delta < 0) return -1;
      if (a.delta < 0 && b.delta >= 0) return 1;
      if (a.delta >= 0) return b.delta - a.delta;
      return a.delta - b.delta; // both negative, most negative last
    });

    const rowsHtml = sorted.map(d => {
      const dir = d.delta > 0 ? 'up' : (d.delta < 0 ? 'down' : 'flat');
      const arrow = d.delta > 0 ? '↑' : (d.delta < 0 ? '↓' : '→');
      const pct = Math.abs(d.delta) / maxAbs * 50; // max fills half the track
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
      <div class="drivers-section">
        <div class="drivers">
          <div class="drivers-title">Drivers del score</div>
          <div class="drivers-sub">Por qué el score es <strong>${m.score}</strong> y no otro: aporte de cada pilar vs. media del peer group (suma neta ${netSign}${net} pts)</div>
          <div class="drivers-grid">${rowsHtml}</div>
        </div>
      </div>
    `;
  }

  // -------- Section: Pilares --------
  function renderPillars(m) {
    const pillarsHtml = m.pillars.map(p => `
      <div class="pillar">
        <svg class="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${window.PILLAR_ICONS[p.icon]}</svg>
        <div class="pillar-name">${p.name}</div>
        <div class="pillar-score">${p.score}<span class="denom">/100</span></div>
        <div class="pillar-bar"><div class="pillar-bar-fill ${p.status}" style="width:${p.score}%"></div></div>
        <div class="pillar-status ${p.status}">${p.statusText}</div>
        <div class="pillar-delta"><strong>${p.delta}</strong> vs. 2023 · ${p.vsPeers} vs. peers</div>
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head">
          <h2>Pilares de sostenibilidad</h2>
          <div class="aux">Score ponderado por pilar</div>
        </div>
        <div class="pillars">${pillarsHtml}</div>
      </div>
    `;
  }

  // -------- Section: KPIs --------
  function renderKPIs(m) {
    const kpisHtml = m.kpis.map(k => `
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
        <div class="section-head">
          <h2>Indicadores clave</h2>
          <div class="aux">Señales destacadas de los 18 subindicadores</div>
        </div>
        <div class="kpi-grid">${kpisHtml}</div>
      </div>
    `;
  }

  // -------- Section: Benchmarking --------
  function renderBench(m, id) {
    const peerScores = window.PEER_GROUP.map(pid => ({
      id: pid, name: window.PEER_LABELS[pid], score: window.DATA[pid].score
    })).sort((a, b) => b.score - a.score);

    const benchRowsHtml = peerScores.map(ps => `
      <div class="bench-row">
        <div class="city-name ${ps.id === id ? 'self' : ''}">${ps.name}</div>
        <div class="bar-track"><div class="bar-fill ${ps.id === id ? 'self' : ''}" style="width:${ps.score}%"></div></div>
        <div class="score-n ${ps.id === id ? 'self' : ''}">${ps.score}</div>
      </div>
    `).join('');
    const avgPeer = (peerScores.reduce((s, p) => s + p.score, 0) / peerScores.length).toFixed(1);

    const histRowsHtml = m.history.map(([yr, sc], idx) => `
      <div class="hist-row">
        <div class="yr">${yr}</div>
        <div class="hist-bar-track"><div class="hist-bar-fill ${idx === m.history.length - 1 ? 'current' : ''}" style="width:${sc}%">${sc}</div></div>
      </div>
    `).join('');

    const histTrendColor = m.histTrendClass === 'ok' ? 'var(--ok)' : (m.histTrendClass === 'risk' ? 'var(--risk)' : 'var(--ink)');

    return `
      <div class="section">
        <div class="section-head">
          <h2>Benchmarking</h2>
          <div class="aux">Comparable histórico + ayuntamientos peer</div>
        </div>
        <div class="bench-grid">
          <div class="bench-card">
            <div class="bench-title">Vs. ayuntamientos comparables</div>
            <div class="bench-sub">Capitales CCAA de tamaño medio · Score global</div>
            <div class="bench-rows">${benchRowsHtml}</div>
            <div class="bench-avg-line"><span>Media del grupo</span><strong>${avgPeer}</strong></div>
          </div>
          <div class="bench-card">
            <div class="bench-title">Evolución histórica</div>
            <div class="bench-sub">Score global del ayuntamiento, últimos 5 ciclos</div>
            <div class="histchart">${histRowsHtml}</div>
            <div class="bench-avg-line"><span>Tendencia 5 años</span><strong style="color: ${histTrendColor};">${m.histTrend}</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  // -------- Section: Insights (MODIFIED: hero + secondary) --------
  function renderInsights(m) {
    const hero = m.insights[0];
    const secondary = m.insights.slice(1);

    const heroHtml = `
      <div class="insight-hero">
        <div class="insight-hero-label">Insight clave</div>
        <div class="insight-hero-title">${hero.title}</div>
        <div class="insight-hero-text">${hero.text}</div>
      </div>
    `;

    const secondaryHtml = secondary.map((ins, i) => `
      <div class="insight">
        <div class="insight-num">${String(i + 2).padStart(2, '0')}</div>
        <div class="insight-body">
          <div class="insight-title">${ins.title}</div>
          <div class="insight-text">${ins.text}</div>
        </div>
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head">
          <h2>Insights automáticos</h2>
          <div class="aux">1 insight clave + ${secondary.length} secundarios</div>
        </div>
        ${heroHtml}
        <div class="insights-secondary">${secondaryHtml}</div>
      </div>
    `;
  }

  // -------- Section: Alertas --------
  function renderAlerts(m) {
    const alertsHtml = m.alerts.map(a => `
      <div class="alert-row">
        <div><span class="alert-level ${a.level}">${a.level === 'high' ? 'Alta' : a.level === 'med' ? 'Media' : 'Baja'}</span></div>
        <div class="alert-text">${a.text}</div>
        <div class="alert-zone">${a.zone}</div>
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head">
          <h2>Alertas priorizadas</h2>
          <div class="aux">${m.alerts.length} riesgos activos</div>
        </div>
        <div class="alerts">${alertsHtml}</div>
      </div>
    `;
  }

  // -------- Section: Recomendaciones (MODIFIED: priority ranking) --------
  function renderRecs(m) {
    const recsHtml = m.recs.map((r, idx) => `
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
        <div class="section-head">
          <h2>Recomendaciones</h2>
          <div class="aux">Ordenadas por prioridad de decisión</div>
        </div>
        <div class="recs">${recsHtml}</div>
      </div>
    `;
  }

  // -------- Section: Retos --------
  function renderRetos(m) {
    const retosHtml = m.retos.map(r => `
      <div class="reto-card ${r.practice ? 'practice' : ''}">
        <div class="reto-label">${r.practice ? 'Mejor práctica peer' : 'Reto descubierto'}</div>
        <div class="reto-title">${r.title}</div>
        <div class="reto-text">${r.text}</div>
        ${r.peer ? `<div class="reto-peer">${r.peer}</div>` : ''}
      </div>
    `).join('');

    return `
      <div class="section">
        <div class="section-head">
          <h2>Retos descubiertos y mejores prácticas</h2>
          <div class="aux">Aprendizajes del benchmarking</div>
        </div>
        <div class="retos-grid">${retosHtml}</div>
      </div>
    `;
  }

  // -------- Main render --------
  window.renderSnapshot = function(id) {
    const m = window.DATA[id];
    if (!m) return;

    const content = document.getElementById('content');
    content.innerHTML = [
      renderExecutive(m),
      renderHeader(m),
      renderDrivers(m),
      renderPillars(m),
      renderKPIs(m),
      renderBench(m, id),
      renderInsights(m),
      renderAlerts(m),
      renderRecs(m),
      renderRetos(m)
    ].join('');

    content.classList.remove('fade-in');
    void content.offsetWidth;
    content.classList.add('fade-in');
  };

})();
