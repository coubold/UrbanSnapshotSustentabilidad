// ======================================================
// URBAN SNAPSHOT v7 · RENDER
// Portfolio + Detail with clickable pillars + Prompt
// ======================================================

(function() {

  const IC = {
    leaf:'<path d="M17 8C8 10 5.9 16.2 3.8 19.5M5 20.5c2-2 4-5 7-6.5 3-1.5 6-1 8.5-.5M12 2c0 4-3 8-7.5 9.5"/>',
    zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    home:'<path d="M3 10.2L12 3l9 7.2V21H3z"/><path d="M9 21v-7h6v7"/>',
    compass:'<circle cx="12" cy="12" r="9"/><polygon points="16.2 7.8 14.5 14.5 7.8 16.2 9.5 9.5"/>',
    building:'<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22V12h6v10M8 6h.01M16 6h.01M8 10h.01M16 10h.01"/>'
  };
  window.PILLAR_ICONS_V7 = IC;

  function icon(name, cls) {
    return `<svg class="${cls || 'pillar-row-icon'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${IC[name]}</svg>`;
  }

  // KPI mapping per pillar index
  const PILLAR_KPIS = [[0,1,2],[3],[6,7],[4,5],[4,5]]; // MA=0,1,2 Energia=3 Territorio=6,7 Movilidad=4,5 Servicios=4,5
  // More accurate mapping
  const KPI_MAP = {
    0: [0,1,2], // Medio ambiente: vegetal, NO2, islas calor
    1: [3],     // Energía: solar
    2: [6,7],   // Territorio: expansion, vivienda
    3: [5],     // Movilidad: transporte
    4: [4],     // Servicios: accesibilidad
  };

  // ======== PORTFOLIO VIEW ========
  window.renderPortfolio = function() {
    const sorted = Object.entries(window.DATA).sort((a,b) => b[1].score - a[1].score);
    const searchId = 'portfolioSearch';

    const rows = sorted.map(([id, m], i) => `
      <div class="portfolio-row" data-id="${id}">
        <div class="portfolio-rank">${i+1}</div>
        <div class="portfolio-info">
          <div class="portfolio-name">${m.name}</div>
          <div class="portfolio-region">${m.region} · ${m.pop} hab.</div>
        </div>
        <div class="portfolio-pillars">
          ${m.pillars.map(p => `<div class="portfolio-pill ${p.status}"></div>`).join('')}
        </div>
        <div class="portfolio-score">${m.score}</div>
        <div class="portfolio-dot ${m.status}"></div>
      </div>
    `).join('');

    document.getElementById('content').innerHTML = `
      <div class="portfolio" id="portfolioView">
        <div class="portfolio-header">
          <div class="portfolio-title">Cartera <em>Instituciones</em></div>
          <input type="text" class="portfolio-search" id="${searchId}" placeholder="Buscar ayuntamiento...">
        </div>
        <div class="portfolio-list" id="portfolioList">${rows}</div>
      </div>
      <div class="detail" id="detailView"></div>
    `;

    // Search filter
    document.getElementById(searchId).addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.portfolio-row').forEach(row => {
        const name = window.DATA[row.dataset.id].name.toLowerCase();
        const region = window.DATA[row.dataset.id].region.toLowerCase();
        row.style.display = (name.includes(q) || region.includes(q)) ? '' : 'none';
      });
    });

    // Click to open detail
    document.querySelectorAll('.portfolio-row').forEach(row => {
      row.addEventListener('click', () => window.openDetail(row.dataset.id));
    });
  };

  // ======== OPEN DETAIL ========
  window.openDetail = function(id) {
    const m = window.DATA[id];
    if (!m) return;

    document.getElementById('portfolioView').classList.add('hidden');
    const detail = document.getElementById('detailView');
    detail.classList.add('active');

    // Update selector
    document.getElementById('selectorInput').value = `${m.name} · ${m.region}`;

    // Build prompt
    const prompt = buildPrompt(m);

    detail.innerHTML = `
      <button class="back-btn" id="backBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Volver a cartera
      </button>

      ${renderHero(m)}
      ${renderExecutive(m)}

      <div class="action-bar">
        <button class="action-btn" onclick="window.print()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Exportar
        </button>
        <button class="action-btn primary" id="btnPrompt">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Preparar prompt
        </button>
      </div>

      <div class="tabs">
        <div class="tab active" data-tab="diagnostico"><span class="tab-num">1</span> Diagnóstico</div>
        <div class="tab" data-tab="evolucion"><span class="tab-num">2</span> Evolución</div>
        <div class="tab" data-tab="ranking"><span class="tab-num">3</span> Ranking</div>
        <div class="tab" data-tab="accion"><span class="tab-num">4</span> Plan de acción</div>
      </div>

      <div class="tab-content active" id="tab-diagnostico">
        ${renderDrivers(m)}
        ${renderPillars(m)}
      </div>

      <div class="tab-content" id="tab-evolucion">
        ${renderEvolution(m)}
      </div>

      <div class="tab-content" id="tab-ranking">
        ${renderRanking(m, id)}
      </div>

      <div class="tab-content" id="tab-accion">
        ${renderRecs(m)}
      </div>

      <!-- PROMPT MODAL -->
      <div class="modal-overlay" id="promptModal">
        <div class="modal">
          <div class="modal-header">
            <div class="modal-header-title">Prompt para análisis financiero</div>
            <button class="modal-close" id="modalClose">&times;</button>
          </div>
          <div class="modal-body">
            <div class="modal-section-label">Prompt generado desde Urban Snapshot · Listo para copiar</div>
            <div class="prompt-box" id="promptText">${prompt}</div>
            <div class="prompt-actions">
              <button class="prompt-copy" id="copyPrompt">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copiar prompt
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('backBtn').addEventListener('click', () => {
      detail.classList.remove('active');
      detail.innerHTML = '';
      document.getElementById('portfolioView').classList.remove('hidden');
    });

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
      });
    });

    // Pillar click to expand
    document.querySelectorAll('.pillar-row').forEach(row => {
      row.addEventListener('click', () => {
        const detailEl = row.nextElementSibling;
        if (detailEl && detailEl.classList.contains('pillar-detail')) {
          detailEl.classList.toggle('open');
        }
      });
    });

    // Prompt modal
    const modal = document.getElementById('promptModal');
    document.getElementById('btnPrompt').addEventListener('click', () => modal.classList.add('open'));
    document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    document.getElementById('copyPrompt').addEventListener('click', () => {
      navigator.clipboard.writeText(document.getElementById('promptText').textContent);
      const btn = document.getElementById('copyPrompt');
      btn.textContent = '✓ Copiado';
      setTimeout(() => { btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copiar prompt'; }, 1500);
    });

    window.scrollTo({ top: 0 });
  };

  // ======== BUILD PROMPT ========
  function buildPrompt(m) {
    const pillarsText = m.pillars.map(p => `  - ${p.name}: ${p.score}/100 (${p.statusText}) · ${p.delta} vs año anterior · ${p.vsPeers} vs peers`).join('\n');
    const kpisText = m.kpis.map(k => `  - ${k.name}: ${k.value} ${k.unit} (${k.trendText}) — ${k.delta}`).join('\n');
    const recsText = m.recs.map((r,i) => `  ${i+1}. [${r.prioText}] ${r.title} — ${r.desc.substring(0,120)}...`).join('\n');
    const insightText = m.insights[0] ? `${m.insights[0].title}: ${m.insights[0].text.replace(/<[^>]*>/g, '')}` : '';

    return `Eres un experto en financiamiento institucional y sostenibilidad para banca. Analiza el siguiente diagnóstico territorial y produce:

1. Evaluación de riesgo crediticio del municipio
2. Elegibilidad ESG y alineamiento con taxonomía europea
3. Potencial de financiación verde (bonos, SLL, project finance)
4. Ajuste de tasa sugerido sobre línea estándar
5. Decisión recomendada: qué producto financiero estructurar, para qué target, con qué ticket estimado

CONTEXTO DEL MUNICIPIO
═══════════════════════
Nombre: ${m.name}
Región: ${m.region}
Población: ${m.pop} habitantes
Superficie: ${m.area}

SCORE DE SOSTENIBILIDAD: ${m.score}/100 — ${m.statusText}
Tendencia: ${m.histTrend} en los últimos 5 ciclos

TESIS PRINCIPAL:
${m.tesis}

LECTURA EJECUTIVA:
${m.ejecutivo}

PILARES (5 dimensiones):
${pillarsText}

INDICADORES CLAVE (8 señales):
${kpisText}

INSIGHT PRINCIPAL:
${insightText}

RECOMENDACIONES DE SOSTENIBILIDAD (priorizadas):
${recsText}

INSTRUCCIONES ADICIONALES:
- Responder en español
- Usar lenguaje de mesa de crédito institucional
- Incluir sizing de oportunidad (ticket estimado en EUR)
- Especificar qué productos BBVA serían aplicables
- Considerar alineamiento con EU Taxonomy y CSRD
- Indicar si el municipio es elegible para garantía BEI/FEI`;
  }

  // ======== HERO (3-col: name | executive | score) ========
  function renderHero(m) {
    const tags = m.tags.map(t => `<span class="tag">${t}</span>`).join('') +
      `<span class="tag">${m.area}</span><span class="tag">${m.pop} hab.</span>`;
    return `
      <div class="hero">
        <div class="hero-left">
          <div class="eyebrow">Ayuntamiento</div>
          <h1>${m.name}<br><em>${m.region}</em></h1>
          <div class="tags">${tags}</div>
        </div>
        <div class="executive">
          <div class="executive-label">Resumen ejecutivo</div>
          <div class="executive-thesis">${m.tesis}</div>
          <div class="executive-reading">${m.ejecutivo}</div>
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
      </div>`;
  }

  function renderExecutive(m) { return ''; } // now inline in hero

  // ======== DRIVERS ========
  function renderDrivers(m) {
    const deltas = m.pillars.map(p => ({ name: p.name, delta: parseInt(p.vsPeers.replace('+','')) || 0 }));
    const maxAbs = Math.max(...deltas.map(d => Math.abs(d.delta))) || 1;
    const sorted = [...deltas].sort((a,b) => { if(a.delta>=0&&b.delta<0) return -1; if(a.delta<0&&b.delta>=0) return 1; return a.delta>=0 ? b.delta-a.delta : a.delta-b.delta; });
    const net = deltas.reduce((s,d) => s+d.delta, 0);
    return `<div class="drivers">
      <div class="drivers-title">Drivers del score</div>
      <div class="drivers-sub">Aporte por pilar vs media peer (neto <strong>${net>0?'+':''}${net}</strong>)</div>
      <div class="drivers-grid">${sorted.map(d => {
        const dir = d.delta>0?'up':(d.delta<0?'down':'flat');
        return `<div class="driver-row">
          <div class="driver-arrow ${dir}">${d.delta>0?'↑':(d.delta<0?'↓':'→')}</div>
          <div class="driver-name">${d.name}</div>
          <div class="driver-bar-wrap"><div class="driver-bar-center"></div><div class="driver-bar ${dir}" style="width:${Math.abs(d.delta)/maxAbs*50}%"></div></div>
          <div class="driver-value ${dir}">${d.delta>0?'+':''}${d.delta}</div>
        </div>`;
      }).join('')}</div>
    </div>`;
  }

  // ======== RADAR ========
  function renderRadar(m) {
    const cx=130,cy=130,r=100,n=5;
    const labels=m.pillars.map(p=>p.name.split(' ')[0]);
    const scores=m.pillars.map(p=>p.score);
    function polar(a,d){const rad=(a-90)*Math.PI/180;return[cx+d*Math.cos(rad),cy+d*Math.sin(rad)];}
    const rings=[20,40,60,80,100].map(pct=>{const pts=[];for(let i=0;i<n;i++){const[x,y]=polar(i*360/n,r*pct/100);pts.push(`${x},${y}`);}return`<polygon points="${pts.join(' ')}" fill="none" stroke="#E5E7EB" stroke-width="${pct===60?1.2:.6}"/>`;}).join('');
    const axes=[];for(let i=0;i<n;i++){const[x,y]=polar(i*360/n,r);axes.push(`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#E5E7EB" stroke-width=".6"/>`);}
    const dataPts=[];for(let i=0;i<n;i++){const[x,y]=polar(i*360/n,r*scores[i]/100);dataPts.push(`${x},${y}`);}
    const lbls=[];for(let i=0;i<n;i++){const[x,y]=polar(i*360/n,r+20);const anchor=x<cx-10?'end':(x>cx+10?'start':'middle');const sc=m.pillars[i].status==='ok'?'#0B8A3B':(m.pillars[i].status==='risk'?'#C4162A':'#B77B00');lbls.push(`<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Plus Jakarta Sans,sans-serif" font-size="8.5" fill="#6B7280" font-weight="600">${labels[i]}</text><text x="${x}" y="${y+12}" text-anchor="${anchor}" font-family="Fraunces,serif" font-size="13" fill="${sc}" font-weight="500">${scores[i]}</text>`);}
    const dots=[];for(let i=0;i<n;i++){const[x,y]=polar(i*360/n,r*scores[i]/100);dots.push(`<circle cx="${x}" cy="${y}" r="3" fill="#004481" stroke="white" stroke-width="1.5"/>`);}
    return`<svg viewBox="0 0 260 260" class="radar-svg" xmlns="http://www.w3.org/2000/svg">${rings}${axes.join('')}<polygon points="${dataPts.join(' ')}" fill="rgba(0,68,129,.12)" stroke="#004481" stroke-width="1.8"/>${dots.join('')}${lbls.join('')}<text x="${cx}" y="${cy+3}" text-anchor="middle" font-family="Fraunces,serif" font-size="26" fill="#004481" font-weight="400">${m.score}</text><text x="${cx}" y="${cy+14}" text-anchor="middle" font-family="Plus Jakarta Sans,sans-serif" font-size="7.5" fill="#9CA3AF" letter-spacing=".1em">SCORE</text></svg>`;
  }

  // ======== PILLARS (clickable, with expandable KPIs) ========
  function renderPillars(m) {
    const pillarKpiMap = [[0,1,2],[3],[6,7],[5],[4]];
    const rows = m.pillars.map((p, pi) => {
      const kpiIndices = pillarKpiMap[pi] || [];
      const kpisHtml = kpiIndices.map(ki => {
        const k = m.kpis[ki];
        if (!k) return '';
        return `<div class="kpi">
          <div class="kpi-head"><div class="kpi-name">${k.name}</div><div class="trend ${k.trend}">${k.trendText}</div></div>
          <div class="kpi-value">${k.value}<span class="unit">${k.unit}</span></div>
          <div class="kpi-delta">${k.delta}</div>
          <div class="kpi-interp">${k.interp}</div>
        </div>`;
      }).join('');

      return `
        <div class="pillar-row" data-pi="${pi}">
          ${icon(p.icon)}
          <div class="pillar-row-name">${p.name}</div>
          <div class="pillar-row-bar"><div class="pillar-bar-fill ${p.status}" style="width:${p.score}%"></div></div>
          <div class="pillar-row-score">${p.score}</div>
          <div class="pillar-row-status ${p.status}">${p.statusText}</div>
          <div class="pillar-row-delta">${p.delta} · ${p.vsPeers} vs peers</div>
        </div>
        <div class="pillar-detail">
          <div class="pillar-detail-kpis">${kpisHtml}</div>
        </div>
      `;
    }).join('');

    return `<div class="section">
      <div class="section-head"><h2>Pilares</h2><div class="aux">Click para ver indicadores</div></div>
      <div class="radar-pillars-grid">
        <div class="radar-wrap">${renderRadar(m)}</div>
        <div class="pillars-compact">${rows}</div>
      </div>
    </div>`;
  }

  // ======== INSIGHT (single hero only) ========
  function renderInsight(m) {
    const h = m.insights[0];
    if (!h) return '';
    return `<div class="insight-hero">
      <div class="insight-hero-label">Insight principal</div>
      <div class="insight-hero-title">${h.title}</div>
      <div class="insight-hero-text">${h.text}</div>
    </div>`;
  }

  // ======== EVOLUTION ========
  function renderEvolution(m) {
    function parseDelta(d){const match=d.match(/([+-]?\d+)/);return match?parseInt(match[1]):0;}
    const pillarEvo = m.pillars.map(p => { const d=parseDelta(p.delta); return{name:p.name,icon:p.icon,score:p.score,prev:p.score-d,delta:d,dir:d>0?'up':(d<0?'down':'flat'),status:p.status}; });
    const tc = m.histTrendClass==='ok'?'var(--ok)':(m.histTrendClass==='risk'?'var(--risk)':'var(--ink)');

    return `<div class="section">
      <div class="section-head"><h2>Evolución</h2><div class="aux">Score + pilares</div></div>
      <div class="evo-grid">
        <div class="bench-card">
          <div class="bench-title">Score global</div>
          <div class="bench-sub">Tendencia: <strong style="color:${tc}">${m.histTrend}</strong></div>
          <div class="histchart">${m.history.map(([yr,sc],i)=>`<div class="hist-row"><div class="yr">${yr}</div><div class="hist-bar-track"><div class="hist-bar-fill ${i===m.history.length-1?'current':''}" style="width:${sc}%">${sc}</div></div></div>`).join('')}</div>
        </div>
        <div class="bench-card">
          <div class="bench-title">Cambio por pilar</div>
          <div class="bench-sub">2024 → 2025</div>
          <div class="evo-pillars">${pillarEvo.map(p=>`<div class="evo-pillar-row">
            ${icon(p.icon)}
            <div class="evo-pillar-name">${p.name}</div>
            <div class="evo-pillar-prev">${p.prev}</div>
            <div class="evo-pillar-arrow">→</div>
            <div class="evo-pillar-curr ${p.status}">${p.score}</div>
            <div class="evo-pillar-delta ${p.dir}">${p.delta>0?'+':''}${p.delta}</div>
            <div class="evo-pillar-bar-wrap"><div class="evo-pillar-bar-prev" style="width:${p.prev}%"></div><div class="evo-pillar-bar-curr ${p.status}" style="width:${p.score}%"></div></div>
          </div>`).join('')}</div>
        </div>
      </div>
    </div>
    ${renderInsight(m)}`;
  }

  // ======== RANKING ========
  function renderRanking(m, id) {
    const all = window.PEER_GROUP;
    const ps = all.map(pid=>({id:pid,name:window.PEER_LABELS[pid],score:window.DATA[pid].score})).sort((a,b)=>b.score-a.score);
    const avg = (ps.reduce((s,p)=>s+p.score,0)/ps.length).toFixed(1);
    const leads = m.pillars.filter(p=>parseInt(p.vsPeers)>0).sort((a,b)=>parseInt(b.vsPeers)-parseInt(a.vsPeers));
    const lags = m.pillars.filter(p=>parseInt(p.vsPeers)<0).sort((a,b)=>parseInt(a.vsPeers)-parseInt(b.vsPeers));

    const pillarCompare = m.pillars.map((pil,pi) => {
      const pd = all.map(pid=>({id:pid,name:window.PEER_LABELS[pid],score:window.DATA[pid].pillars[pi].score,status:window.DATA[pid].pillars[pi].status})).sort((a,b)=>b.score-a.score);
      const pAvg = (pd.reduce((s,p)=>s+p.score,0)/pd.length).toFixed(0);
      const selfRank = pd.findIndex(p=>p.id===id)+1;
      const selfScore = pd.find(p=>p.id===id).score;
      const leader = pd[0];
      const gap = leader.score - selfScore;
      return`<div class="ranking-pillar-card">
        <div class="ranking-pillar-header">
          ${icon(pil.icon)}
          <div class="ranking-pillar-title">${pil.name}</div>
          <div class="ranking-pillar-position">#${selfRank}</div>
        </div>
        <div class="ranking-pillar-bars">${pd.slice(0,5).map(p=>`<div class="ranking-bar-row">
          <div class="ranking-bar-name ${p.id===id?'self':''}">${p.name}</div>
          <div class="ranking-bar-track"><div class="ranking-bar-fill ${p.id===id?'self':''}" style="width:${p.score}%"></div></div>
          <div class="ranking-bar-score ${p.id===id?'self':''}">${p.score}</div>
        </div>`).join('')}</div>
        <div class="ranking-pillar-footer"><span>Media: ${pAvg}</span><span>${gap>0?`Gap: -${gap}`:''}</span></div>
      </div>`;
    }).join('');

    return`
      <div class="section">
        <div class="section-head"><h2>Ranking global</h2><div class="aux">${ps.length} ayuntamientos</div></div>
        <div class="bench-card">
          <div class="bench-rows">${ps.map((p,i)=>`<div class="bench-row">
            <div class="rank-num">${i+1}.</div>
            <div class="city-name ${p.id===id?'self':''}">${p.name}</div>
            <div class="bar-track"><div class="bar-fill ${p.id===id?'self':''}" style="width:${p.score}%"></div></div>
            <div class="score-n ${p.id===id?'self':''}">${p.score}</div>
          </div>`).join('')}</div>
          <div class="bench-avg-line"><span>Media</span><strong>${avg}</strong></div>
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>Fortalezas y brechas</h2><div class="aux">${m.name} vs peers</div></div>
        <div class="leads-lags-grid">
          <div class="leads-card"><div class="leads-label ok">Lidera en</div>${leads.length?leads.map(p=>`<div class="leads-item"><div class="leads-item-name">${p.name}</div><div class="leads-item-delta ok">${p.vsPeers}</div></div>`).join(''):'<div class="leads-item"><div class="leads-item-name" style="color:var(--muted)">—</div></div>'}</div>
          <div class="leads-card"><div class="leads-label risk">Brecha en</div>${lags.length?lags.map(p=>`<div class="leads-item"><div class="leads-item-name">${p.name}</div><div class="leads-item-delta risk">${p.vsPeers}</div></div>`).join(''):'<div class="leads-item"><div class="leads-item-name" style="color:var(--muted)">Sin brechas</div></div>'}</div>
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>Por pilar</h2><div class="aux">Top 5</div></div>
        <div class="ranking-pillars-grid">${pillarCompare}</div>
      </div>`;
  }

  // ======== RECS ========
  // Map pilar text abbreviations to icon keys
  function pilarIcons(text) {
    const map = {
      'MA': 'leaf', 'Medio ambiente': 'leaf', 'medio ambiente': 'leaf',
      'Energía': 'zap', 'energía': 'zap',
      'Territorio': 'home', 'Vivienda': 'home', 'territorio': 'home', 'vivienda': 'home',
      'Mov': 'compass', 'Movilidad': 'compass', 'movilidad': 'compass',
      'Serv': 'building', 'Servicios': 'building', 'servicios': 'building',
      'Transversal': 'compass', 'Salud': 'leaf',
    };
    // Split by + and render each as icon
    const parts = text.split(/\s*\+\s*/);
    return parts.map(p => {
      const key = map[p.trim()] || 'compass';
      return `<span title="${p.trim()}">${icon(key, 'rec-pilar-icon')}</span>`;
    }).join('');
  }

  function renderRecs(m) {
    return`<div class="section">
      <div class="section-head"><h2>Recomendaciones</h2><div class="aux">Priorizadas</div></div>
      <div class="recs">${m.recs.map((r,i)=>`<div class="rec prio-${r.prio}">
        <div class="rec-rank">0${i+1}</div>
        <div class="rec-body">
          <div class="rec-priority prio-${r.prio}">${r.prioText}</div>
          <div class="rec-title">${r.title}</div>
          <div class="rec-desc">${r.desc}</div>
          <div class="rec-meta">
            <div class="rec-meta-item"><span class="k">Horizonte</span><span class="v">${r.h}</span></div>
            <div class="rec-meta-item"><span class="k">Esfuerzo</span><span class="v">${r.e}</span></div>
            <div class="rec-meta-item"><span class="k">Impacto</span><span class="v">${r.i}</span></div>
            <div class="rec-meta-item"><span class="k">Pilares</span><span class="v rec-pilares">${pilarIcons(r.p)}</span></div>
          </div>
        </div>
      </div>`).join('')}</div>
    </div>`;
  }

  // Legacy compat
  window.renderSnapshot = function(id) { window.openDetail(id); };

})();
