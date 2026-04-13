// =============================================================
// UI rendering + orchestration
// =============================================================

const STATE = {
  modo: "instituciones",  // "instituciones" | "real_estate"
  entidadId: "madrid",
  kpiActivo: "aire"
};

function entidadActual() {
  if (STATE.modo === "instituciones") {
    return hidratar(MUNICIPIOS[STATE.entidadId]);
  }
  return ACTIVOS[STATE.entidadId];
}

// ---------- Score card ----------
function renderScoreCard() {
  const ent = entidadActual();
  const score = scoreCompuesto(ent.kpis);
  const cal = calificacion(score);
  const oferta = ofertaFinanciera(score);
  const tipoLabel = STATE.modo === "instituciones" ? "Municipio" : ent.tipo;
  const subinfo = STATE.modo === "instituciones"
    ? `<strong>${(ent.poblacion/1000000).toFixed(2)} M</strong> habitantes · <strong>${ent.superficie_km2} km²</strong>`
    : `<strong>${(ent.superficie_m2/1000).toFixed(0)}k m²</strong> · radio ${ent.radio_influencia_km} km`;

  document.getElementById("score-card").innerHTML = `
    <div class="score-title">${tipoLabel} · Score BoldOS</div>
    <div class="score-entity">${ent.nombre}</div>
    <div class="score-main">
      <div class="score-value" style="color:${cal.color === '#F9A825' ? '#FFE082' : 'white'}">${score}</div>
      <div class="score-denom">/100</div>
    </div>
    <div class="score-badge">
      <span class="letter" style="color:${cal.color}">${cal.letra}</span>
      ${cal.label}
    </div>
    <div class="score-line"></div>
    <div class="score-meta">
      ${subinfo}<br>
      <span style="opacity:0.7">Clúster comparable:</span><br>
      <strong>${ent.cluster}</strong>
    </div>
    <div class="financial-offer">
      <div class="tag">Oferta BBVA vinculada</div>
      <h4>${oferta.titulo}</h4>
      <div class="row"><span>Bonificación de tipo</span><b>${oferta.bonificacion}</b></div>
      <div class="row"><span>Monto elegible</span><b>${oferta.monto}</b></div>
      <p>${oferta.detalle}</p>
    </div>`;
}

// ---------- KPI grid ----------
function renderKPIs() {
  const ent = entidadActual();
  const grid = document.getElementById("kpi-grid");
  grid.innerHTML = KPI_ORDEN.map(k => {
    const kpi = ent.kpis[k];
    const s = scoreKPI(kpi);
    const cal = calificacion(s);
    const delta = deltaSerie(kpi.serie, kpi.direccion);
    const arrow = parseFloat(delta.delta) > 0 ? "▲" : parseFloat(delta.delta) < 0 ? "▼" : "▬";
    const arrowClass = parseFloat(delta.delta) > 0 ? "up" : "down";
    const tag = delta.mejora ? "good" : "warn";
    const tagTxt = delta.mejora ? "MEJORA" : "DETERIORO";
    return `
      <div class="kpi-card" data-kpi="${k}" style="border-top-color:${cal.color}">
        <div class="kpi-head">
          <div class="kpi-label">${kpi.label}</div>
          <div class="kpi-icon">${KPI_ICONOS[k]}</div>
        </div>
        <div class="kpi-value-row">
          <div class="kpi-value">${kpi.valor_2025}</div>
          <div class="kpi-unit">${kpi.unidad}</div>
        </div>
        <div class="kpi-spark">${sparkline(kpi.serie, kpi.direccion)}</div>
        <div class="kpi-delta">
          <span class="${arrowClass}">${arrow} ${delta.delta} (${delta.pct}%)</span>
          <span class="${tag}">${tagTxt} 10a</span>
        </div>
        <div class="kpi-score-bar">
          <div class="kpi-score-fill" style="width:${s}%;background:${cal.color}"></div>
        </div>
        <div class="kpi-score-txt">
          <span>Score KPI</span><b>${s}/100 · ${cal.letra}</b>
        </div>
        <div class="kpi-source">${kpi.fuente}</div>
      </div>`;
  }).join("");

  // Click en KPI → activa en histórico
  grid.querySelectorAll(".kpi-card").forEach(card => {
    card.addEventListener("click", () => {
      STATE.kpiActivo = card.dataset.kpi;
      renderHistorico();
      renderHotspots();
    });
  });
}

// ---------- Histórico ----------
function renderHistorico() {
  const ent = entidadActual();
  const chartDiv = document.getElementById("chart-area");
  const kpi = ent.kpis[STATE.kpiActivo];
  chartDiv.innerHTML = historicoChart(kpi, STATE.kpiActivo);

  const controls = document.getElementById("chart-controls");
  controls.innerHTML = KPI_ORDEN.map(k => `
    <button class="chart-btn ${k === STATE.kpiActivo ? 'active' : ''}" data-k="${k}">
      ${KPI_ICONOS[k]} ${ent.kpis[k].label}
    </button>
  `).join("");
  controls.querySelectorAll(".chart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      STATE.kpiActivo = btn.dataset.k;
      renderHistorico();
      renderHotspots();
    });
  });
}

// ---------- Peer ranking (solo para Instituciones) ----------
function renderPeers() {
  const panel = document.getElementById("panel-peers");
  if (STATE.modo !== "instituciones") { panel.style.display = "none"; return; }
  panel.style.display = "";
  const ranking = rankingPares(STATE.entidadId);
  document.getElementById("peer-list").innerHTML = ranking.map((p,i) => `
    <div class="peer-row ${p.esTarget ? 'target' : ''}">
      <div class="peer-rank">#${i+1}</div>
      <div>
        <div class="peer-name">${p.nombre} ${p.esTarget ? '<span style="color:#1464A5">← seleccionado</span>' : ''}</div>
        <div class="peer-pop">${(p.poblacion/1000000).toFixed(2)} M hab</div>
      </div>
      <div></div>
      <div class="peer-bar-wrap"><div class="peer-bar-fill" style="width:${p.score}%"></div></div>
      <div class="peer-score">${p.score}</div>
    </div>`).join("");
}

// ---------- Retos + fortalezas ----------
function renderFindings() {
  const ent = entidadActual();
  document.getElementById("finding-list").innerHTML = ent.retos.map(r => `
    <div class="finding ${r.severidad}">
      <div class="stripe"></div>
      <div>
        <h5>${r.titulo}<span class="sev">${r.severidad}</span></h5>
        <p>${r.detalle}</p>
      </div>
    </div>`).join("");
  document.getElementById("strengths-list").innerHTML = ent.fortalezas.map(f => `<li>${f}</li>`).join("");
}

// ---------- Recomendaciones ----------
function renderRecos() {
  const ent = entidadActual();
  const recos = recomendaciones(ent);
  const panel = document.getElementById("reco-list");
  if (recos.length === 0) {
    panel.innerHTML = `<div class="reco-item"><h6>Sin recomendaciones críticas</h6><p>Todos los KPIs se encuentran en zona aceptable o superior.</p></div>`;
    return;
  }
  panel.innerHTML = recos.map(r => `
    <div class="reco-item">
      <h6>${KPI_ICONOS[r.kpi]} ${r.label} · score ${r.score}/100</h6>
      <p>${r.texto}</p>
    </div>`).join("");
}

// ---------- Mejores prácticas (solo Instituciones) ----------
function renderBestPractices() {
  const ent = entidadActual();
  const panel = document.getElementById("panel-best");
  if (STATE.modo !== "instituciones") { panel.style.display = "none"; return; }
  panel.style.display = "";
  const list = mejoresPracticas(ent);
  // Actualizar título del panel dinámicamente
  const titulo = panel.querySelector("h3");
  titulo.innerHTML = `Mejores prácticas del clúster <span class="tag">peer learning</span>`;
  const subtitulo = panel.querySelector("p");
  subtitulo.textContent = `Municipios del clúster que superan a ${ent.nombre} en al menos un KPI, con la práctica asociada inferida por BoldOS.`;
  document.getElementById("best-list").innerHTML = list.length === 0
    ? `<div class="best-item"><h6>${ent.nombre} lidera en todos los KPIs del clúster</h6></div>`
    : list.map(p => `
        <div class="best-item">
          <div class="lider">Referente: ${p.lider} · +${p.delta} pts vs ${ent.nombre}</div>
          <h6>${KPI_ICONOS[p.kpi]} ${p.label}</h6>
          <p>Adoptar ${p.accion}.</p>
        </div>`).join("");
}

// ---------- Hotspots de distritos (solo Madrid) ----------
function renderHotspots() {
  const ent = entidadActual();
  const panel = document.getElementById("panel-hotspots");
  if (STATE.modo !== "instituciones" || !ent.hotspots) { panel.style.display = "none"; return; }
  panel.style.display = "";
  const hs = ent.hotspots[STATE.kpiActivo];
  const kpi = ent.kpis[STATE.kpiActivo];
  const dir = kpi.direccion === "menor_es_mejor";
  document.getElementById("hotspot-title").textContent = `${KPI_ICONOS[STATE.kpiActivo]} ${kpi.label} · distritos`;
  document.getElementById("hotspot-mejores").innerHTML = hs.mejores.map((d,i) => `
    <div class="hotspot-row best">
      <span class="hs-rank">#${i+1}</span>
      <span class="hs-name">${d.distrito}</span>
      <span class="hs-val">${d.valor} <span class="hs-unit">${d.unidad}</span></span>
    </div>`).join("");
  document.getElementById("hotspot-peores").innerHTML = hs.peores.map((d,i) => `
    <div class="hotspot-row worst">
      <span class="hs-rank">#${i+1}</span>
      <span class="hs-name">${d.distrito}</span>
      <span class="hs-val">${d.valor} <span class="hs-unit">${d.unidad}</span></span>
    </div>`).join("");
  document.getElementById("hotspot-subtitle").textContent =
    `Top 3 ${dir ? 'con menor valor' : 'con mayor valor'} (mejores) vs top 3 ${dir ? 'con mayor valor' : 'con menor valor'} (peores) · brecha intra-municipio`;
}

// ---------- Plan de inversión para mejorar el score ----------
function renderPlanInversion() {
  const ent = entidadActual();
  const panel = document.getElementById("panel-inversion");
  if (!ent.plan_inversion) { panel.style.display = "none"; return; }
  panel.style.display = "";
  const score = scoreCompuesto(ent.kpis);
  const cal = calificacion(score);
  const pi = ent.plan_inversion;
  document.getElementById("inversion-content").innerHTML = `
    <div class="escenario">
      <div class="esc-header">
        <div><div class="esc-label">Escenario 1 · pasar a grado B</div><div class="esc-score">De ${cal.letra} (${score}) a B (${score + parseInt(pi.c_a_b.puntos_score)})</div></div>
        <div class="esc-monto"><div>${pi.c_a_b.monto}</div><div class="esc-plazo">${pi.c_a_b.plazo} · ${pi.c_a_b.puntos_score} pts</div></div>
      </div>
      <ul class="esc-partidas">${pi.c_a_b.partidas.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>
    <div class="escenario premium">
      <div class="esc-header">
        <div><div class="esc-label">Escenario 2 · alcanzar grado A</div><div class="esc-score">De B (${score + parseInt(pi.c_a_b.puntos_score)}) a A (${score + parseInt(pi.c_a_b.puntos_score) + parseInt(pi.b_a_a.puntos_score)})</div></div>
        <div class="esc-monto"><div>${pi.b_a_a.monto}</div><div class="esc-plazo">${pi.b_a_a.plazo} · ${pi.b_a_a.puntos_score} pts</div></div>
      </div>
      <ul class="esc-partidas">${pi.b_a_a.partidas.map(p => `<li>${p}</li>`).join("")}</ul>
    </div>
    <div class="inversion-total">
      <div>
        <div class="inv-label">Inversión total estimada para grado A</div>
        <div class="inv-nota">Financiable vía Sustainability-Linked Loan + Green Bond, con verificación multitemporal BoldOS por KPI.</div>
      </div>
      <div class="inv-monto">${sumarMontos(pi.c_a_b.monto, pi.b_a_a.monto)}</div>
    </div>`;
}

function sumarMontos(a, b) {
  const parse = s => parseFloat(s.replace(",", ".").replace(/[^\d.]/g, ""));
  const total = parse(a) + parse(b);
  const unit = a.includes("M€") ? "M€" : "€";
  return total.toFixed(1).replace(".", ",") + " " + unit;
}

// ---------- Selector de entidad ----------
function renderSelector() {
  const select = document.getElementById("selector-entidad");
  const ctx = document.getElementById("contexto-entidad");
  if (STATE.modo === "instituciones") {
    // Orden: Madrid primero, luego por población descendente
    const ordenados = Object.values(MUNICIPIOS).sort((a,b) => {
      if (a.id === "madrid") return -1;
      if (b.id === "madrid") return 1;
      return b.poblacion - a.poblacion;
    });
    select.innerHTML = ordenados.map(m =>
      `<option value="${m.id}" ${m.id === STATE.entidadId ? 'selected' : ''}>Ayuntamiento de ${m.nombre}${m.id === "madrid" ? ' · caso demo' : ''}</option>`
    ).join("");
    select.disabled = false;
    const ent = MUNICIPIOS[STATE.entidadId];
    const demo = STATE.entidadId === "madrid"
      ? "datos 2015–2025 por sensorización multitemporal"
      : "KPIs sensorizados · resto de datos inferidos por BoldOS";
    ctx.innerHTML = `<span><strong>${(ent.poblacion/1000000).toFixed(2)} M</strong> habitantes · ${demo}</span>`;
  } else {
    select.innerHTML = Object.values(ACTIVOS).map(a =>
      `<option value="${a.id}" ${a.id === STATE.entidadId ? 'selected' : ''}>${a.nombre} · ${a.tipo}</option>`
    ).join("");
    select.disabled = false;
    const a = ACTIVOS[STATE.entidadId];
    ctx.innerHTML = `<span><strong>${a.localizacion}</strong> · radio de influencia ${a.radio_influencia_km} km</span>`;
  }
}

// ---------- Render completo ----------
function render() {
  renderSelector();
  renderScoreCard();
  renderKPIs();
  renderHistorico();
  renderHotspots();
  renderPeers();
  renderFindings();
  renderRecos();
  renderBestPractices();
  renderPlanInversion();
}

// ---------- Bootstrap ----------
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".mode-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      STATE.modo = tab.dataset.modo;
      STATE.entidadId = STATE.modo === "instituciones" ? "madrid" : "cc_plaza_norte";
      STATE.kpiActivo = "aire";
      document.querySelectorAll(".mode-tab").forEach(t => t.classList.toggle("active", t === tab));
      render();
    });
  });
  document.getElementById("selector-entidad").addEventListener("change", e => {
    STATE.entidadId = e.target.value;
    STATE.kpiActivo = "aire";
    render();
  });
  render();
});
