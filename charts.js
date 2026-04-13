// =============================================================
// SVG micro-charts (vanilla, sin dependencias)
// =============================================================

function sparkline(serie, direccion, width = 160, height = 32) {
  const max = Math.max(...serie), min = Math.min(...serie);
  const rango = max - min || 1;
  const step = width / (serie.length - 1);
  const pts = serie.map((v,i) => `${i*step},${height - ((v - min)/rango)*height}`).join(" ");
  const ultimo = serie[serie.length-1], primero = serie[0];
  const mejora = direccion === "menor_es_mejor" ? ultimo < primero : ultimo > primero;
  const color = mejora ? "#2E7D32" : "#C62828";
  const area = `0,${height} ${pts} ${width},${height}`;
  const gradId = `g${Math.random().toString(36).slice(2,8)}`;
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradId}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${area}" fill="url(#${gradId})"/>
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8"/>
      <circle cx="${(serie.length-1)*step}" cy="${height - ((ultimo - min)/rango)*height}" r="3" fill="${color}"/>
    </svg>`;
}

function historicoChart(kpi, kpiKey) {
  const W = 860, H = 280, ML = 50, MR = 20, MT = 20, MB = 40;
  const iw = W - ML - MR, ih = H - MT - MB;
  const serie = kpi.serie;
  const max = Math.max(kpi.critico, kpi.optimo, ...serie);
  const min = Math.min(kpi.critico, kpi.optimo, ...serie);
  const rango = max - min || 1;
  const step = iw / (serie.length - 1);

  const scaleY = v => MT + ih - ((v - min)/rango) * ih;
  const scaleX = i => ML + i * step;

  const pts = serie.map((v,i) => `${scaleX(i)},${scaleY(v)}`).join(" ");

  // Bandas óptimo/crítico
  const bandOpt = kpi.direccion === "menor_es_mejor"
    ? { y1: scaleY(kpi.optimo), y2: MT }
    : { y1: MT, y2: scaleY(kpi.optimo) };
  const bandCrit = kpi.direccion === "menor_es_mejor"
    ? { y1: MT + ih, y2: scaleY(kpi.critico) }
    : { y1: scaleY(kpi.critico), y2: MT + ih };

  // Y-axis ticks
  const ticks = [min, min + rango*0.25, min + rango*0.5, min + rango*0.75, max];
  const yTicks = ticks.map(t => `
    <line x1="${ML}" x2="${ML+iw}" y1="${scaleY(t)}" y2="${scaleY(t)}" stroke="#EEF2F7" stroke-width="1"/>
    <text x="${ML-8}" y="${scaleY(t)+4}" text-anchor="end" font-size="10" fill="#5B6670">${t.toFixed(1)}</text>
  `).join("");

  // X-axis
  const xTicks = ANIOS.map((a,i) => `
    <text x="${scaleX(i)}" y="${MT+ih+18}" text-anchor="middle" font-size="10" fill="#5B6670">${a}</text>
  `).join("");

  // Points
  const circles = serie.map((v,i) => `
    <circle cx="${scaleX(i)}" cy="${scaleY(v)}" r="3.5" fill="#1464A5" stroke="white" stroke-width="1.5"/>
  `).join("");

  return `
    <svg width="100%" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${ML}" y="${Math.min(bandOpt.y1,bandOpt.y2)}" width="${iw}" height="${Math.abs(bandOpt.y2-bandOpt.y1)}" fill="#E8F5E9" opacity="0.6"/>
      <rect x="${ML}" y="${Math.min(bandCrit.y1,bandCrit.y2)}" width="${iw}" height="${Math.abs(bandCrit.y2-bandCrit.y1)}" fill="#FFEBEE" opacity="0.6"/>
      ${yTicks}
      ${xTicks}
      <polyline points="${pts}" fill="none" stroke="#1464A5" stroke-width="2.2"/>
      ${circles}
      <line x1="${ML}" x2="${ML+iw}" y1="${scaleY(kpi.optimo)}" y2="${scaleY(kpi.optimo)}" stroke="#2E7D32" stroke-width="1.2" stroke-dasharray="4,3"/>
      <text x="${ML+iw-4}" y="${scaleY(kpi.optimo)-4}" text-anchor="end" font-size="10" fill="#2E7D32" font-weight="600">óptimo ${kpi.optimo}</text>
      <line x1="${ML}" x2="${ML+iw}" y1="${scaleY(kpi.critico)}" y2="${scaleY(kpi.critico)}" stroke="#C62828" stroke-width="1.2" stroke-dasharray="4,3"/>
      <text x="${ML+iw-4}" y="${scaleY(kpi.critico)-4}" text-anchor="end" font-size="10" fill="#C62828" font-weight="600">crítico ${kpi.critico}</text>
      <text x="${ML}" y="${MT-6}" font-size="11" fill="#072146" font-weight="700">${kpi.label} — ${kpi.unidad}</text>
    </svg>`;
}
