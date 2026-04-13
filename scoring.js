// =============================================================
// Scoring: normalización 0-100, composite, peer ranking
// =============================================================

function normalizar(valor, optimo, critico, direccion) {
  if (direccion === "menor_es_mejor") {
    if (valor <= optimo) return 100;
    if (valor >= critico) return 0;
    return Math.round(100 * (critico - valor) / (critico - optimo));
  } else {
    if (valor >= optimo) return 100;
    if (valor <= critico) return 0;
    return Math.round(100 * (valor - critico) / (optimo - critico));
  }
}

function scoreKPI(kpi) {
  return normalizar(kpi.valor_2025, kpi.optimo, kpi.critico, kpi.direccion);
}

function scoreCompuesto(kpis) {
  let total = 0;
  for (const k of KPI_ORDEN) {
    total += scoreKPI(kpis[k]) * PESOS[k];
  }
  return Math.round(total);
}

function calificacion(score) {
  if (score >= 80) return { letra:"A", color:"#2E7D32", label:"Excelente" };
  if (score >= 65) return { letra:"B", color:"#558B2F", label:"Bueno" };
  if (score >= 50) return { letra:"C", color:"#F9A825", label:"Medio" };
  if (score >= 35) return { letra:"D", color:"#EF6C00", label:"Bajo" };
  return             { letra:"E", color:"#C62828", label:"Crítico" };
}

// Score de pares (municipios) con parámetros equivalentes a los de Madrid
function scorePeerMunicipio(peerKpisFlat, refKpis) {
  let total = 0;
  for (const k of KPI_ORDEN) {
    const s = normalizar(peerKpisFlat[k], refKpis[k].optimo, refKpis[k].critico, refKpis[k].direccion);
    total += s * PESOS[k];
  }
  return Math.round(total);
}

function rankingPares(targetId) {
  const ref = MUNICIPIOS.madrid.kpis; // parámetros de normalización siempre desde Madrid
  const todos = Object.values(MUNICIPIOS).map(m => {
    let score, kpisFlat;
    if (m.id === "madrid") {
      score = scoreCompuesto(MUNICIPIOS.madrid.kpis);
    } else {
      score = scorePeerMunicipio(m.kpis, ref);
    }
    return {
      id: m.id, nombre: m.nombre, poblacion: m.poblacion,
      score,
      esTarget: m.id === targetId
    };
  });
  todos.sort((a,b) => b.score - a.score);
  return todos;
}

// Delta multitemporal (primer vs último año de la serie)
function deltaSerie(serie, direccion) {
  const delta = serie[serie.length-1] - serie[0];
  const mejora = direccion === "menor_es_mejor" ? delta < 0 : delta > 0;
  return { delta: delta.toFixed(1), mejora, pct: Math.abs(delta / serie[0] * 100).toFixed(0) };
}

// Mejores prácticas inferidas de pares que superan a Madrid en un KPI
function mejoresPracticas(targetEntidad) {
  const target = targetEntidad || MUNICIPIOS.madrid;
  const ref = MUNICIPIOS.madrid.kpis;
  const targetKpis = target.kpis;
  const pares = Object.values(MUNICIPIOS).filter(m => m.id !== target.id);
  const practicas = [];
  const PRACTICAS_TXT = {
    aire:        "zonas de bajas emisiones agresivas y electrificación del transporte público",
    verde:       "corredores ecológicos y renaturalización de ejes urbanos",
    calor:       "pavimentos fríos, sombreado arbóreo y cubiertas verdes a escala de barrio",
    agua:        "SUDS (drenaje urbano sostenible) y recuperación de cauces",
    impermeable: "requisitos de permeabilidad mínima en nuevos desarrollos",
    energia:     "autoconsumo compartido y comunidades energéticas locales"
  };
  for (const k of KPI_ORDEN) {
    const targetVal = typeof targetKpis[k] === "object" ? targetKpis[k].valor_2025 : targetKpis[k];
    const targetScore = normalizar(targetVal, ref[k].optimo, ref[k].critico, ref[k].direccion);
    const lider = pares
      .map(p => {
        const v = typeof p.kpis[k] === "object" ? p.kpis[k].valor_2025 : p.kpis[k];
        return { nombre: p.nombre, s: normalizar(v, ref[k].optimo, ref[k].critico, ref[k].direccion) };
      })
      .sort((a,b) => b.s - a.s)[0];
    if (lider.s > targetScore + 10) {
      practicas.push({
        kpi: k, label: ref[k].label, lider: lider.nombre,
        delta: lider.s - targetScore,
        accion: PRACTICAS_TXT[k]
      });
    }
  }
  return practicas;
}

// Recomendaciones generadas por la capa Thot sobre deltas y gaps
function recomendaciones(entidad) {
  const out = [];
  const kpis = entidad.kpis;
  for (const k of KPI_ORDEN) {
    const s = scoreKPI(kpis[k]);
    if (s < 50) {
      out.push({
        kpi: k, label: kpis[k].label, score: s,
        texto: sugerirAccion(k, s, kpis[k])
      });
    }
  }
  return out.sort((a,b) => a.score - b.score).slice(0, 4);
}

function sugerirAccion(k, score, kpi) {
  const gap = Math.abs(kpi.valor_2025 - kpi.optimo);
  const plantillas = {
    aire:        `Reforzar la zona de bajas emisiones y electrificar flotas municipales. Brecha al óptimo: ${gap.toFixed(1)} ${kpi.unidad}.`,
    verde:       `Ampliar cobertura verde priorizando barrios por debajo de 10 m²/hab. Brecha al óptimo: ${gap.toFixed(1)} ${kpi.unidad}.`,
    calor:       `Intervenir los 5 hotspots térmicos con cubiertas verdes, pavimentos fríos y arbolado de sombra. Brecha al óptimo: ${gap.toFixed(1)} °C.`,
    agua:        `Desplegar infraestructura SUDS en cuencas críticas. Brecha al óptimo del índice: ${gap.toFixed(0)} puntos.`,
    impermeable: `Condicionar nuevas licencias a permeabilidad mínima del 30%. Brecha al óptimo: ${gap.toFixed(1)} puntos.`,
    energia:     `Acelerar comunidades energéticas y autoconsumo en edificios públicos. Brecha al óptimo: ${gap.toFixed(1)} kWp/1.000 hab.`
  };
  return plantillas[k];
}

// Oferta financiera BBVA en función del score
function ofertaFinanciera(score) {
  if (score >= 80) return {
    titulo: "Green Bond municipal · condiciones premium",
    bonificacion: "-75 pb", monto: "hasta 250 M€",
    detalle: "Elegible para emisión verde con mejor rating ESG del clúster. Bonificación máxima de tipo por cumplimiento de KPIs verificados por BoldOS."
  };
  if (score >= 65) return {
    titulo: "Sustainability-Linked Loan · bonificación estándar",
    bonificacion: "-50 pb", monto: "hasta 150 M€",
    detalle: "Préstamo vinculado a mantenimiento y mejora de 3 KPIs con verificación multitemporal anual."
  };
  if (score >= 50) return {
    titulo: "Financiación de transición · acompañamiento técnico",
    bonificacion: "-25 pb", monto: "hasta 80 M€",
    detalle: "Línea de inversión condicionada a plan de mejora de 2 KPIs en el horizonte 2026–2028."
  };
  return {
    titulo: "Plan de acción previo a financiación",
    bonificacion: "—", monto: "—",
    detalle: "El perfil actual requiere un plan de remediación con hitos medibles antes de acceder a condiciones verdes. BoldOS provee la línea base y el seguimiento."
  };
}

// =============================================================
// Hidratación: convierte un peer (KPIs planos) en entidad completa
// =============================================================

function generarSerie(valor2025, kpiKey, direccion) {
  // Tendencias típicas por KPI (magnitud de cambio desde 2015 hasta 2025)
  const tendencias = {
    aire:        0.35,   // NO2 bajó mucho (mejora)
    verde:       0.12,   // Verde creció modestamente
    calor:       0.25,   // Isla de calor empeoró
    agua:        0.08,   // Riesgo hídrico subió levemente
    impermeable: 0.15,   // Impermeable creció
    energia:     0.90    // Solar explotó (factor multiplicativo)
  };
  const factor = tendencias[kpiKey] || 0.15;
  const serie = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    let v;
    if (kpiKey === "energia") {
      // Crecimiento exponencial desde casi 0
      v = valor2025 * Math.pow(t, 2.3) + (1 - t) * 0.5;
    } else if (direccion === "menor_es_mejor") {
      // Valor inicial más alto (peor), converge al 2025
      const inicial = valor2025 * (1 + factor);
      v = inicial - (inicial - valor2025) * t;
    } else {
      // Valor inicial más bajo, crece al 2025
      const inicial = valor2025 * (1 - factor);
      v = inicial + (valor2025 - inicial) * t;
    }
    // Ruido leve
    const ruido = (Math.sin(i * 2.3 + kpiKey.length) * 0.02 * valor2025);
    serie.push(parseFloat((v + ruido).toFixed(1)));
  }
  serie[10] = valor2025; // fijar el 2025 exacto
  return serie;
}

function generarForecast(valor2025, kpiKey, direccion) {
  const tendencias_fc = {
    aire:        -0.04,   // sigue mejorando
    verde:       0.02,    // sigue creciendo lento
    calor:       0.03,    // empeora por cambio climático
    agua:        0.04,    // empeora
    impermeable: 0.01,    // casi estable
    energia:     0.15     // sigue creciendo
  };
  const tasa = tendencias_fc[kpiKey] || 0;
  const fc = [];
  let v = valor2025;
  for (let i = 0; i < 5; i++) {
    v = v * (1 + tasa);
    fc.push(parseFloat(v.toFixed(1)));
  }
  return fc;
}

function hidratar(peer) {
  if (peer.id === "madrid") return MUNICIPIOS.madrid;
  // Si ya tiene estructura completa, no re-hidratar
  if (peer.kpis && peer.kpis.aire && typeof peer.kpis.aire === "object") return peer;

  const ref = MUNICIPIOS.madrid.kpis;
  const kpisHidratados = {};
  for (const k of KPI_ORDEN) {
    const valor = peer.kpis[k];
    kpisHidratados[k] = {
      label: ref[k].label,
      unidad: ref[k].unidad,
      valor_2025: valor,
      serie: generarSerie(valor, k, ref[k].direccion),
      forecast: generarForecast(valor, k, ref[k].direccion),
      optimo: ref[k].optimo,
      critico: ref[k].critico,
      direccion: ref[k].direccion,
      fuente: ref[k].fuente
    };
  }

  // Generar retos basados en KPIs con score bajo
  const retos = [];
  const fortalezas = [];
  for (const k of KPI_ORDEN) {
    const s = scoreKPI(kpisHidratados[k]);
    const gap = Math.abs(kpisHidratados[k].valor_2025 - ref[k].optimo).toFixed(1);
    if (s < 35) {
      retos.push({
        titulo: `${ref[k].label} en situación crítica`,
        severidad: "alta",
        detalle: `Valor actual ${valor2025Fmt(kpisHidratados[k])} — brecha de ${gap} ${ref[k].unidad} respecto al óptimo normativo.`
      });
    } else if (s < 55) {
      retos.push({
        titulo: `${ref[k].label} con margen de mejora`,
        severidad: "media",
        detalle: `Valor actual ${valor2025Fmt(kpisHidratados[k])} — posición media en el clúster, con espacio para converger al óptimo.`
      });
    } else if (s >= 70) {
      fortalezas.push(`${ref[k].label}: posición destacada en el clúster (${valor2025Fmt(kpisHidratados[k])}).`);
    }
  }
  if (fortalezas.length === 0) {
    fortalezas.push("Oportunidad de posicionamiento ESG mediante mejora sistémica sobre todo el panel KPI.");
  }

  // Plan de inversión escalado por población
  const escala = peer.poblacion / 3340000; // Madrid como referencia
  const planInv = generarPlanInversion(escala);

  return {
    id: peer.id,
    nombre: peer.nombre,
    poblacion: peer.poblacion,
    superficie_km2: peer.superficie_km2 || Math.round(peer.poblacion / 5500),
    cluster: inferirCluster(peer.poblacion),
    kpis: kpisHidratados,
    retos: retos.slice(0, 4),
    fortalezas: fortalezas.slice(0, 4),
    plan_inversion: planInv
  };
}

function valor2025Fmt(kpi) {
  return `${kpi.valor_2025} ${kpi.unidad}`;
}

function inferirCluster(pob) {
  if (pob >= 1500000) return "Capital > 1,5M hab · área metropolitana consolidada";
  if (pob >= 700000)  return "Gran capital 700k–1,5M hab · clima mediterráneo";
  if (pob >= 400000)  return "Capital media 400k–700k hab · conurbación regional";
  return "Capital < 400k hab · núcleo urbano regional";
}

function generarPlanInversion(escala) {
  const base_cb = 180, base_ba = 420;
  const monto_cb = (base_cb * escala).toFixed(0);
  const monto_ba = (base_ba * escala).toFixed(0);
  return {
    c_a_b: {
      monto: `${monto_cb} M€`, plazo: "4 años", puntos_score: "+15",
      partidas: [
        `Renaturalización de corredores urbanos (~${(monto_cb * 0.35).toFixed(0)} M€)`,
        `Electrificación de transporte público (~${(monto_cb * 0.25).toFixed(0)} M€)`,
        `SUDS en cuencas críticas (~${(monto_cb * 0.20).toFixed(0)} M€)`,
        `PV municipal + comunidades energéticas (~${(monto_cb * 0.20).toFixed(0)} M€)`
      ]
    },
    b_a_a: {
      monto: `${monto_ba} M€`, plazo: "6 años", puntos_score: "+17",
      partidas: [
        `Despavimentación selectiva y renaturalización profunda (~${(monto_ba * 0.38).toFixed(0)} M€)`,
        `Cubiertas verdes en edificación pública (~${(monto_ba * 0.26).toFixed(0)} M€)`,
        `Peatonalización de ejes principales (~${(monto_ba * 0.21).toFixed(0)} M€)`,
        `Autoconsumo distribuido a escala distrito (~${(monto_ba * 0.15).toFixed(0)} M€)`
      ]
    }
  };
}
