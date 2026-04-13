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
  const ref = MUNICIPIOS.madrid.kpis;
  const pares = Object.values(MUNICIPIOS)
    .filter(m => m.id !== "madrid")
    .map(m => ({
      id: m.id, nombre: m.nombre, poblacion: m.poblacion,
      score: scorePeerMunicipio(m.kpis, ref),
      kpis: m.kpis
    }));
  const madridScore = scoreCompuesto(MUNICIPIOS.madrid.kpis);
  pares.push({ id:"madrid", nombre:"Madrid", poblacion: MUNICIPIOS.madrid.poblacion,
               score: madridScore, kpis: null, esTarget:true });
  pares.sort((a,b) => b.score - a.score);
  return pares;
}

// Delta multitemporal (primer vs último año de la serie)
function deltaSerie(serie, direccion) {
  const delta = serie[serie.length-1] - serie[0];
  const mejora = direccion === "menor_es_mejor" ? delta < 0 : delta > 0;
  return { delta: delta.toFixed(1), mejora, pct: Math.abs(delta / serie[0] * 100).toFixed(0) };
}

// Mejores prácticas inferidas de pares que superan a Madrid en un KPI
function mejoresPracticas() {
  const ref = MUNICIPIOS.madrid.kpis;
  const pares = Object.values(MUNICIPIOS).filter(m => m.id !== "madrid");
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
    const madridScore = scoreKPI(ref[k]);
    const lider = pares
      .map(p => ({ nombre:p.nombre, s: normalizar(p.kpis[k], ref[k].optimo, ref[k].critico, ref[k].direccion) }))
      .sort((a,b) => b.s - a.s)[0];
    if (lider.s > madridScore + 10) {
      practicas.push({
        kpi: k, label: ref[k].label, lider: lider.nombre,
        delta: lider.s - madridScore,
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
