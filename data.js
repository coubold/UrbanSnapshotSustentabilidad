// ======================================================
// TERRITORY SNAPSHOT · DATA
// 8 ayuntamientos españoles con datos completos
// ======================================================

window.DATA = {
  valladolid: {
    name: 'Valladolid', region: 'Castilla y León', area: '197,5 km²', pop: '298.412',
    tags: ['Capital CCAA'],
    score: 64, status: 'warn', statusText: 'En observación',
    tesis: 'Un modelo de expansión urbana de baja densidad avanza sin acompañamiento de transición energética ni provisión de servicios en las nuevas áreas, amplificando la desigualdad entre el centro consolidado y la periferia.',
    ejecutivo: 'Desempeño equilibrado con fortalezas en movilidad (+8 vs peers) y medio ambiente (+4). Los retrasos críticos están en transición energética (-6) y servicios públicos (-4), con una tendencia agregada negativa de -2 puntos en los últimos 3 años. La pérdida se concentra en tres barrios periféricos con déficit compuesto.',
    peers: { vs: '+3 pts', vsClass: 'up', ccaa: '+5 pts', ccaaClass: 'up', yr: '-2 pts', yrClass: 'down', rank: '3 / 8' },
    pillars: [
      { name: 'Medio ambiente', score: 71, status: 'ok', statusText: 'Aceptable', delta: '↑ +2', vsPeers: '+4', icon: 'leaf' },
      { name: 'Energía', score: 58, status: 'warn', statusText: 'En retraso', delta: '↑ +3', vsPeers: '-6', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 66, status: 'ok', statusText: 'Aceptable', delta: '↓ -4', vsPeers: '+1', icon: 'home' },
      { name: 'Movilidad', score: 73, status: 'ok', statusText: 'Bueno', delta: '→ 0', vsPeers: '+8', icon: 'compass' },
      { name: 'Servicios públicos', score: 52, status: 'risk', statusText: 'En retraso', delta: '↓ -5', vsPeers: '-4', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '26,3', unit: '%', trend: 'up-good', trendText: '↑ +1,8 pp', delta: '14,2 m²/hab · sobre umbral OMS', interp: 'Buen nivel agregado, pero 48% concentrado en dos parques. Distribución inequitativa por barrio.' },
      { name: 'Calidad del aire (NO₂)', value: '32', unit: 'µg/m³', trend: 'up-warn', trendText: '↑ +6%', delta: 'media anual · umbral UE: 40', interp: 'Por debajo del límite legal pero superando la directiva UE 2030 (20 µg/m³). Picos en eje A-62.' },
      { name: 'Islas de calor urbanas', value: '+5,8', unit: '°C', trend: 'up-bad', trendText: '↑ +1,2 °C/déc', delta: 'diferencial centro / periurbano', interp: 'Crecimiento sostenido. Cuatro focos nuevos en barrios con menos del 9% de cobertura arbórea.' },
      { name: 'Potencial solar en tejados', value: '412', unit: 'GWh/año', trend: 'flat', trendText: 'Sin ejecución', delta: 'equiv. 23% del consumo eléctrico', interp: 'Capacidad técnica instalable muy alta. Solo 2,1% aprovechado. Oportunidad de autoconsumo.' },
      { name: 'Accesibilidad a servicios', value: '61', unit: '%', trend: 'down', trendText: '↓ -4 pp', delta: 'población a 15 min caminando', interp: 'Edu, salud, sociales y reciclaje combinados. Tres barrios por debajo del 40%: Pajarillos, Las Viudas, Girón.' },
      { name: 'Cobertura transporte público', value: '78', unit: '%', trend: 'up-good', trendText: '↑ +2 pp', delta: 'población a 300 m de parada', interp: 'Por encima de peers. Déficit focalizado en desarrollos periurbanos recientes del sur.' },
      { name: 'Expansión urbana', value: '+0,8', unit: '%', trend: 'up-warn', trendText: '↑ +89 ha', delta: 'suelo sellado anual', interp: 'Crecimiento moderado pero mayormente en baja densidad, contrario a tendencia europea de consolidación.' },
      { name: 'Vivienda vacía detectable', value: '13,8', unit: '%', trend: 'flat', trendText: 'Estable', delta: 'parque residencial · INE + señales', interp: 'Superior a media nacional (10,8%). Concentración en casco histórico y primera periferia.' }
    ],
    history: [ [2021, 66], [2022, 68], [2023, 66], [2024, 65], [2025, 64] ],
    histTrend: '↓ -2 pts', histTrendClass: 'risk',
    insights: [
      { title: 'Déficit compuesto en 3 barrios', text: 'Pajarillos, Las Viudas y Girón presentan simultáneamente <strong>déficit de verde urbano, accesibilidad a servicios &lt; 40% y sobrecalentamiento</strong>. Constituyen el núcleo de mayor desigualdad territorial y deberían concentrar el 60% del esfuerzo de inversión municipal.' },
      { title: 'Energía: brecha vs peers', text: 'Pilar Energía <strong>6 puntos bajo peers</strong>. Vitoria lidera con 18% de ejecución solar; Valladolid solo 2,1% pese a mayor potencial.' },
      { title: 'Verde inequitativamente distribuido', text: 'El promedio supera el umbral OMS pero <strong>el 48% se concentra en dos parques</strong>. Nueve barrios con menos de 4 m²/hab.' },
      { title: 'Vivienda vacía como oportunidad', text: '13,8% de vacancia — <strong>3 pp sobre media nacional</strong>. Palanca para regenerar sin expansión de suelo.' }
    ],
    alerts: [
      { level: 'high', text: 'Tres barrios con déficit compuesto (verde + servicios + transporte)', zone: 'Pajarillos · Las Viudas · Girón' },
      { level: 'high', text: 'NO₂ por encima de directiva UE 2030 en corredores principales', zone: 'Ejes A-62 y VA-20' },
      { level: 'med', text: 'Retraso estructural en transición energética vs peers', zone: 'Todo el ejido' },
      { level: 'med', text: 'Cuatro focos nuevos de isla de calor sin cobertura arbórea', zone: 'Delicias, Rondilla y La Victoria' },
      { level: 'med', text: 'Vacancia residencial 3 pp sobre media nacional', zone: 'Casco histórico y primera periferia' }
    ],
    recs: [
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Intervención integral en 3 barrios con déficit compuesto', desc: 'Pajarillos, Las Viudas y Girón: corredor verde + centro social + reciclaje + parada BUS secundaria. Ataca simultáneamente los tres pilares más débiles del municipio con un único proyecto coordinado.', h: '18–36 meses', e: 'Alto', i: 'Muy alto', p: 'MA + Serv + Mov' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Plan solar fotovoltaico en edificios públicos', desc: '412 GWh/año de potencial técnico detectado. Fase inicial sobre 40 cubiertas municipales. Autoconsumo directo, payback 6–8 años y cierre de brecha con peers.', h: '12–24 meses', e: 'Medio', i: 'Alto', p: 'Energía' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Programa de regeneración de vivienda vacía', desc: '13,8% vacancia concentrada geográficamente. Movilizar parque existente antes de habilitar suelo nuevo. Compatible con bonificaciones fiscales y línea de crédito verde.', h: '12–24 meses', e: 'Medio', i: 'Alto', p: 'Territorio' },
      { prio: 'media', prioText: 'Prioridad media', title: 'Protocolo de arbolado en focos de calor', desc: 'Intervención sobre 4 focos identificados. Cobertura arbórea objetivo: del 9% al 18% en 5 años. Costo acotado, respuesta medible en 2 temporadas.', h: '6–18 meses', e: 'Bajo', i: 'Medio-Alto', p: 'Medio ambiente' }
    ],
    retos: [
      { practice: false, title: 'Desigualdad territorial intra-municipal', text: 'La media municipal oculta barrios con performance crítica simultánea en múltiples pilares. El score agregado no es suficiente: se requiere lectura de equidad territorial como nuevo KPI.' },
      { practice: false, title: 'Brecha entre potencial y ejecución energética', text: 'Valladolid tiene mejor potencial solar técnico que Vitoria, pero 8× menos ejecución. El cuello de botella no es físico sino institucional y financiero.' },
      { practice: true, title: 'Vitoria-Gasteiz · Anillo Verde', text: 'Sistema periurbano de 30 km² que integra áreas verdes, movilidad activa y regulación de expansión en una sola figura de planeamiento. Replicable parcialmente en la Ribera del Pisuerga.', peer: 'Score MA: 84 · Lidera peer group' },
      { practice: true, title: 'Pamplona · Distribución equitativa de verde', text: 'Ningún barrio de Pamplona bajo 7 m²/hab gracias a un plan de micro-parques. Valladolid tiene 9 barrios por debajo de ese umbral.', peer: 'Equidad verde: 0,91 (Valladolid: 0,62)' }
    ]
  },

  vitoria: {
    name: 'Vitoria-Gasteiz', region: 'País Vasco', area: '276,8 km²', pop: '253.996',
    tags: ['Capital Euskadi', 'European Green Capital 2012'],
    score: 76, status: 'ok', statusText: 'Bueno',
    tesis: 'El reto ya no es mejorar sino sostener el liderazgo: los peers están cerrando brecha y el modelo requiere renovación continua para no ser alcanzado.',
    ejecutivo: 'Líder absoluto del peer group (+15 pts sobre media) en 4 de los 5 pilares. El Anillo Verde y un despliegue solar del 18% sostienen una ventaja estructural. Único pilar rezagado: servicios públicos con saturación sanitaria focalizada en el norte. Tendencia histórica de mejora sostenida: +6 pts en 5 ciclos.',
    peers: { vs: '+15 pts', vsClass: 'up', ccaa: '+9 pts', ccaaClass: 'up', yr: '+2 pts', yrClass: 'up', rank: '1 / 8' },
    pillars: [
      { name: 'Medio ambiente', score: 84, status: 'ok', statusText: 'Excelente', delta: '↑ +3', vsPeers: '+17', icon: 'leaf' },
      { name: 'Energía', score: 78, status: 'ok', statusText: 'Bueno', delta: '↑ +4', vsPeers: '+14', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 72, status: 'ok', statusText: 'Bueno', delta: '↑ +1', vsPeers: '+7', icon: 'home' },
      { name: 'Movilidad', score: 79, status: 'ok', statusText: 'Bueno', delta: '↑ +2', vsPeers: '+14', icon: 'compass' },
      { name: 'Servicios públicos', score: 68, status: 'ok', statusText: 'Aceptable', delta: '→ 0', vsPeers: '+12', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '42,1', unit: '%', trend: 'up-good', trendText: '↑ +0,8 pp', delta: '21,6 m²/hab · referencia europea', interp: 'Liderazgo indiscutido. El Anillo Verde integra áreas naturales y rurales en una figura de planeamiento única.' },
      { name: 'Calidad del aire (NO₂)', value: '18', unit: 'µg/m³', trend: 'up-good', trendText: '↓ -3%', delta: 'ya bajo directiva UE 2030', interp: 'Cumple anticipadamente umbrales 2030. Red de ciclocarriles y supermanzanas reducen tráfico motorizado.' },
      { name: 'Islas de calor urbanas', value: '+2,1', unit: '°C', trend: 'flat', trendText: 'Estable', delta: 'diferencial centro / periurbano', interp: 'Efecto de isla contenido por densidad arbórea. Menor de los 8 peers analizados.' },
      { name: 'Potencial solar en tejados', value: '285', unit: 'GWh/año', trend: 'up-good', trendText: '↑ 18% ejecutado', delta: '18% ya aprovechado', interp: 'Mejor ratio potencial / ejecución del peer group. Benchmarking energético para el resto del grupo.' },
      { name: 'Accesibilidad a servicios', value: '82', unit: '%', trend: 'up-good', trendText: '↑ +3 pp', delta: 'población a 15 min caminando', interp: 'Alta cobertura homogénea. Supermanzanas consolidan la proximidad de servicios esenciales.' },
      { name: 'Cobertura transporte público', value: '91', unit: '%', trend: 'up-good', trendText: '↑ +1 pp', delta: 'población a 300 m de parada', interp: 'Referencia nacional. Tranvía urbano, BRT y red de cercanías complementarias.' },
      { name: 'Expansión urbana', value: '+0,2', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'suelo sellado anual', interp: 'Política de crecimiento hacia dentro. Prácticamente no hay suelo sellado nuevo en 5 años.' },
      { name: 'Vivienda vacía detectable', value: '7,2', unit: '%', trend: 'up-good', trendText: '↓ -1,2 pp', delta: 'parque residencial', interp: 'Por debajo de media nacional. Mercado tensionado, oportunidad acotada de regeneración.' }
    ],
    history: [ [2021, 70], [2022, 72], [2023, 74], [2024, 75], [2025, 76] ],
    histTrend: '↑ +6 pts', histTrendClass: 'ok',
    insights: [
      { title: 'Los peers están cerrando brecha', text: 'Aunque Vitoria mantiene el liderazgo absoluto, <strong>la brecha con peers se redujo 3 pts en 2 años</strong>. Sin renovación continua del modelo, el liderazgo estructural no está garantizado a 5 años vista. Sostener requiere hoy innovación proactiva, no gestión reactiva.' },
      { title: 'Referencia europea en Medio Ambiente', text: 'Score 84, <strong>17 puntos sobre media peer</strong>. El Anillo Verde es modelo imitado por París y Copenhague.' },
      { title: 'Único déficit: saturación sanitaria norte', text: 'Pilar Servicios en 68, único no líder. <strong>Red hospitalaria saturada en Lakua-Abetxuko</strong> es el reto estructural pendiente.' },
      { title: 'Territorio consolidado sin expansión', text: 'Expansión urbana prácticamente nula (+0,2%/año). <strong>Modelo de crecimiento hacia dentro</strong> sin precedentes en el grupo.' }
    ],
    alerts: [
      { level: 'med', text: 'Saturación de red hospitalaria en distrito norte', zone: 'Lakua · Abetxuko · Sansomendi' },
      { level: 'med', text: 'Presión turística creciente en casco medieval', zone: 'Casco Viejo' },
      { level: 'low', text: 'Densificación pendiente en perímetro del Anillo Verde', zone: 'Borde sur' }
    ],
    recs: [
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Ampliación de red de salud en distrito norte', desc: 'Único cuello de botella detectado. Centro de salud adicional equilibraría la accesibilidad sanitaria al nivel del resto del municipio.', h: '24–36 meses', e: 'Alto', i: 'Medio', p: 'Servicios' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Certificación del modelo "Anillo Verde" como patrimonio funcional', desc: 'Proteger el activo diferencial del municipio mediante figura normativa europea. Asegurar continuidad del modelo ante cambios políticos.', h: '12 meses', e: 'Bajo', i: 'Alto', p: 'Medio ambiente' },
      { prio: 'media', prioText: 'Prioridad media', title: 'Programa de exportación de know-how municipal', desc: 'Monetizar asesoría a peers mediante hermanamientos. Burgos, León y Valladolid ya han solicitado visitas técnicas.', h: '6–12 meses', e: 'Bajo', i: 'Medio', p: 'Transversal' },
      { prio: 'media', prioText: 'Prioridad media', title: 'Plan de gestión de turismo en casco medieval', desc: 'Presión turística creciendo 12%/año. Gestión temprana evita deterioro visto en Salamanca y Santiago.', h: '12–18 meses', e: 'Medio', i: 'Medio', p: 'Territorio' }
    ],
    retos: [
      { practice: false, title: 'Difícil mantener el liderazgo', text: 'Peers cerrando brecha en sostenibilidad ambiental. El reto ya no es mejorar sino no ser alcanzado. Requiere renovación continua del modelo.' },
      { practice: false, title: 'Saturación del modelo de servicios', text: 'El diseño compacto que genera alta accesibilidad también produce sobrecarga puntual en equipamientos sanitarios y educativos del norte.' },
      { practice: true, title: 'Copenhague · Carbon Neutrality 2025', text: 'Modelo de descarbonización con monitorización continua y bonos climáticos municipales. Aplicable al siguiente salto energético de Vitoria.', peer: 'Score Energía: 91 (referencia europea)' },
      { practice: true, title: 'Friburgo · Vauban & Rieselfeld', text: 'Barrios de desarrollo sostenible con movilidad sin coche y energía cero. Potencial piloto en la expansión sur de Vitoria.', peer: 'Modelo de barrio sostenible consolidado' }
    ]
  },

  pamplona: {
    name: 'Pamplona', region: 'Navarra', area: '25,1 km²', pop: '204.572',
    tags: ['Capital Navarra', 'Alta densidad urbana'],
    score: 70, status: 'ok', statusText: 'Bueno',
    tesis: 'La fortaleza del ejido esconde un problema metropolitano: la expansión, la movilidad pendular y la vivienda ocurren en un perímetro tres veces mayor al analizado.',
    ejecutivo: 'Desempeño consistentemente bueno (+9 vs peers) con equidad territorial ejemplar y la mejor distribución de verde urbano del grupo. Compacidad genera eficiencia de servicios (85% a 15 min) pero limita potencial solar. El crecimiento real ocurre fuera del ejido: Burlada, Barañáin y Villava absorben la expansión funcional que el municipio evita.',
    peers: { vs: '+9 pts', vsClass: 'up', ccaa: '+4 pts', ccaaClass: 'up', yr: '+1 pt', yrClass: 'up', rank: '2 / 8' },
    pillars: [
      { name: 'Medio ambiente', score: 74, status: 'ok', statusText: 'Bueno', delta: '↑ +2', vsPeers: '+7', icon: 'leaf' },
      { name: 'Energía', score: 64, status: 'ok', statusText: 'Aceptable', delta: '↑ +4', vsPeers: '0', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 68, status: 'ok', statusText: 'Aceptable', delta: '→ 0', vsPeers: '+3', icon: 'home' },
      { name: 'Movilidad', score: 76, status: 'ok', statusText: 'Bueno', delta: '↑ +3', vsPeers: '+11', icon: 'compass' },
      { name: 'Servicios públicos', score: 71, status: 'ok', statusText: 'Bueno', delta: '↑ +1', vsPeers: '+15', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '28,7', unit: '%', trend: 'up-good', trendText: '↑ +1,1 pp', delta: '18,3 m²/hab · muy distribuido', interp: 'Distribución equitativa excepcional. Ningún barrio bajo 7 m²/hab gracias a micro-parques.' },
      { name: 'Calidad del aire (NO₂)', value: '24', unit: 'µg/m³', trend: 'up-good', trendText: '↓ -2%', delta: 'dentro de umbral UE 2030', interp: 'Cumplimiento anticipado. Reducción continua gracias a peatonalización del Casco Antiguo.' },
      { name: 'Islas de calor urbanas', value: '+3,4', unit: '°C', trend: 'flat', trendText: 'Estable', delta: 'diferencial moderado', interp: 'Compacidad y cobertura arbórea contienen el efecto. Zonas sensibles en ensanches del sur.' },
      { name: 'Potencial solar en tejados', value: '198', unit: 'GWh/año', trend: 'up-warn', trendText: '↑ 6% ejecutado', delta: 'ejecución creciente pero baja', interp: 'Compacidad limita el potencial bruto, pero hay recorrido. Plan municipal en fase inicial.' },
      { name: 'Accesibilidad a servicios', value: '85', unit: '%', trend: 'up-good', trendText: '↑ +2 pp', delta: 'población a 15 min caminando', interp: 'Referencia nacional. Compacidad urbana y mixtura de usos generan alta proximidad.' },
      { name: 'Cobertura transporte público', value: '88', unit: '%', trend: 'up-good', trendText: '↑ +3 pp', delta: 'población a 300 m de parada', interp: 'Red Villavesa de alta frecuencia. Integración con cercanías y taxi compartido rural.' },
      { name: 'Expansión urbana', value: '+0,4', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'crecimiento mayormente vertical', interp: 'Densificación controlada. Presión sobre área metropolitana (Burlada, Barañáin) fuera del ejido.' },
      { name: 'Vivienda vacía detectable', value: '9,1', unit: '%', trend: 'flat', trendText: 'Estable', delta: 'en línea con media nacional', interp: 'Mercado tensionado por demanda universitaria y metropolitana. Vacancia mayoritariamente friccional.' }
    ],
    history: [ [2021, 67], [2022, 68], [2023, 69], [2024, 69], [2025, 70] ],
    histTrend: '↑ +3 pts', histTrendClass: 'ok',
    insights: [
      { title: 'El crecimiento real está fuera del mapa municipal', text: 'Mientras el ejido de Pamplona permanece estable, <strong>Burlada, Barañáin, Villava y Ansoáin absorben la expansión funcional</strong>. El Snapshot actual subestima sistemáticamente la huella del municipio y puede invisibilizar riesgos ambientales reales.' },
      { title: 'Equidad territorial ejemplar', text: '<strong>Ningún barrio bajo 7 m²/hab de verde accesible</strong>. Índice de equidad 0,91, el mejor del peer group. Modelo replicable.' },
      { title: 'Servicios lideran peer group', text: 'Score 71 en Servicios — <strong>15 puntos sobre media</strong>. Red educativa, sanitaria y social densamente distribuida.' },
      { title: 'Compacidad como límite energético', text: '204k habitantes en 25 km² hacen eficientes los servicios pero <strong>limitan el potencial solar</strong> por superficie de tejado.' }
    ],
    alerts: [
      { level: 'med', text: 'Tensión en mercado de vivienda por demanda universitaria', zone: 'Ensanche · Milagrosa · Iturrama' },
      { level: 'med', text: 'Expansión descontrolada en área metropolitana', zone: 'Burlada · Barañáin · Villava' },
      { level: 'low', text: 'Ejecución solar por debajo del potencial técnico', zone: 'Tejados municipales' }
    ],
    recs: [
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Snapshot extendido a área metropolitana funcional', desc: 'Incorporar Burlada, Barañáin, Villava y Ansoáin para diagnóstico real. El modelo municipal actual subestima sistemáticamente la huella funcional de Pamplona.', h: '6–12 meses', e: 'Medio', i: 'Alto', p: 'Transversal' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Programa solar fotovoltaico municipal acelerado', desc: 'Pasar del 6% al 20% de ejecución del potencial en 3 años. Priorizar tejados de edificios educativos y deportivos.', h: '18–36 meses', e: 'Medio', i: 'Alto', p: 'Energía' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Observatorio de vivienda universitaria', desc: 'Monitorizar presión inmobiliaria en barrios con alta densidad estudiantil. Base para políticas de vivienda asequible.', h: '12 meses', e: 'Bajo', i: 'Medio', p: 'Vivienda' },
      { prio: 'media', prioText: 'Prioridad media', title: 'Codificación del modelo de equidad verde', desc: 'Convertir la distribución equitativa de micro-parques en norma urbanística, para blindarla ante cambios de gobierno.', h: '12 meses', e: 'Bajo', i: 'Alto', p: 'Medio ambiente' }
    ],
    retos: [
      { practice: false, title: 'Techo funcional del modelo compacto', text: 'La compacidad genera eficiencia pero limita potencial solar, vivienda asequible y expansión planificada. El próximo salto requiere integración metropolitana.' },
      { practice: false, title: 'Invisibilidad metropolitana', text: 'El score municipal oculta dinámicas funcionales: expansión, movilidad pendular y vivienda ocurren en un perímetro 3× mayor al ejido.' },
      { practice: true, title: 'Vitoria-Gasteiz · Ejecución energética', text: 'Modelo de despliegue solar municipal que Pamplona puede adaptar, aun con menor superficie de tejado disponible.', peer: 'Score Energía: 78 (Pamplona: 64)' },
      { practice: true, title: 'Bilbao · Gobernanza metropolitana', text: 'Bilbao Metropolitano integra 35 municipios en una figura común de planeamiento. Aplicable a la Comarca de Pamplona.', peer: 'Modelo de gobernanza metropolitana consolidado' }
    ]
  },

  salamanca: {
    name: 'Salamanca', region: 'Castilla y León', area: '38,6 km²', pop: '143.812',
    tags: ['Patrimonio UNESCO', 'Universitaria'],
    score: 62, status: 'warn', statusText: 'En observación',
    tesis: 'La turistización del núcleo histórico desplaza residentes y bloquea inversión energética, convirtiendo el patrimonio UNESCO en un activo económico vaciado de función urbana.',
    ejecutivo: 'Municipio tensionado por su doble condición de patrimonio UNESCO y destino turístico. Buena accesibilidad a servicios por compacidad histórica, pero con retraso energético por restricción patrimonial (-9 vs peers), vaciado residencial acelerado (16,4% vacancia) y vulnerabilidad térmica estival crítica (+6,2°C en casco antiguo). Tendencia 5 años: -2 pts.',
    peers: { vs: '-2 pts', vsClass: 'down', ccaa: '+3 pts', ccaaClass: 'up', yr: '-1 pt', yrClass: 'down', rank: '5 / 8' },
    pillars: [
      { name: 'Medio ambiente', score: 68, status: 'ok', statusText: 'Aceptable', delta: '↓ -1', vsPeers: '+1', icon: 'leaf' },
      { name: 'Energía', score: 55, status: 'risk', statusText: 'En retraso', delta: '↑ +2', vsPeers: '-9', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 58, status: 'warn', statusText: 'Bajo presión', delta: '↓ -3', vsPeers: '-7', icon: 'home' },
      { name: 'Movilidad', score: 66, status: 'ok', statusText: 'Aceptable', delta: '→ 0', vsPeers: '+1', icon: 'compass' },
      { name: 'Servicios públicos', score: 65, status: 'ok', statusText: 'Aceptable', delta: '↑ +1', vsPeers: '+9', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '22,4', unit: '%', trend: 'down', trendText: '↓ -0,6 pp', delta: '11,8 m²/hab · bajo umbral OMS', interp: 'Parque fluvial del Tormes concentra el 52%. Barrios del norte y oeste con déficit crítico.' },
      { name: 'Calidad del aire (NO₂)', value: '29', unit: 'µg/m³', trend: 'flat', trendText: '→ estable', delta: 'dentro de límite UE actual', interp: 'Presión del tráfico universitario y turístico. Picos estacionales durante periodo académico.' },
      { name: 'Islas de calor urbanas', value: '+6,2', unit: '°C', trend: 'up-bad', trendText: '↑ +1,8 °C/déc', delta: 'diferencial elevado', interp: 'Piedra de Villamayor y trama histórica densa intensifican el efecto. Casco antiguo crítico en verano.' },
      { name: 'Potencial solar en tejados', value: '168', unit: 'GWh/año', trend: 'flat', trendText: 'Sin ejecución', delta: 'restringido por patrimonio', interp: 'Protección patrimonial limita el 40% del potencial. Oportunidad en tejados no protegidos del arrabal.' },
      { name: 'Accesibilidad a servicios', value: '71', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'compacidad histórica', interp: 'Buena accesibilidad en el centro, con déficit en barrios periféricos de Pizarrales y Vidal.' },
      { name: 'Cobertura transporte público', value: '81', unit: '%', trend: 'up-good', trendText: '↑ +1 pp', delta: 'urbano municipal', interp: 'Buena cobertura urbana. Debilidad en conexión con área metropolitana y Villamayor.' },
      { name: 'Expansión urbana', value: '+0,3', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'restringida por suelo', interp: 'Crecimiento limitado por topografía y protección rural. Expansión funcional hacia Santa Marta y Villares.' },
      { name: 'Vivienda vacía detectable', value: '16,4', unit: '%', trend: 'up-bad', trendText: '↑ +1,2 pp', delta: 'muy por encima de media nacional', interp: 'Turistización y segunda vivienda universitaria. Airbnb estimado: 1.870 unidades activas.' }
    ],
    history: [ [2021, 64], [2022, 64], [2023, 63], [2024, 62], [2025, 62] ],
    histTrend: '↓ -2 pts', histTrendClass: 'risk',
    insights: [
      { title: 'El patrimonio se está convirtiendo en activo vaciado', text: '<strong>1.870 viviendas en alquiler turístico estimadas, 16,4% vacancia</strong> fuera de temporada, tráfico universitario contaminando, protección patrimonial bloqueando solar. El casco histórico genera riqueza económica pero pierde función residencial — el modelo agota el recurso que explota.' },
      { title: 'Patrimonio como restricción energética', text: 'La protección UNESCO <strong>limita el 40% del potencial solar</strong>. Modelo de excepción patrimonial pendiente de diseño técnico.' },
      { title: 'Isla de calor intensificada por piedra histórica', text: 'Piedra de Villamayor y trama medieval densa generan <strong>+6,2°C diferencial</strong>, con impacto sanitario documentado en verano.' },
      { title: 'Déficit verde focalizado norte', text: 'Pizarrales y Vidal con <strong>menos de 3 m²/hab de verde accesible</strong>. Desigualdad norte-sur estructural.' }
    ],
    alerts: [
      { level: 'high', text: 'Presión turística generando vaciado residencial', zone: 'Casco Histórico · San Antonio' },
      { level: 'high', text: 'Isla de calor crítica en casco antiguo durante verano', zone: 'Todo el Conjunto Histórico' },
      { level: 'med', text: 'Déficit verde estructural en barrios del norte', zone: 'Pizarrales · Vidal · Prosperidad' },
      { level: 'med', text: 'Protección patrimonial frena transición energética', zone: 'Conjunto Histórico UNESCO' }
    ],
    recs: [
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Marco regulatorio para vivienda turística', desc: 'Limitar nuevas licencias en zonas tensionadas. Aplicar modelo Barcelona/San Sebastián adaptado al Conjunto Histórico antes que la vacancia supere el 20%.', h: '12–18 meses', e: 'Alto', i: 'Alto', p: 'Vivienda' },
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Plan de refugio climático estival en casco antiguo', desc: 'Pérgolas vegetales, pavimentos fríos, red de sombras verticales. Intervención discreta compatible con protección patrimonial. Reducir impacto sanitario de olas de calor.', h: '18–24 meses', e: 'Medio', i: 'Alto', p: 'MA + Salud' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Protocolo "Patrimonio Solar" — fotovoltaica discreta', desc: 'Negociar con Patrimonio catálogo de soluciones fotovoltaicas integradas. Desbloquear al menos 60 GWh/año adicionales.', h: '24 meses', e: 'Alto', i: 'Medio', p: 'Energía' },
      { prio: 'media', prioText: 'Prioridad media', title: 'Plan verde para barrios del norte', desc: 'Pizarrales, Vidal y Prosperidad con objetivo de 7 m²/hab en 5 años. Oportunidad de regeneración en suelos industriales obsoletos.', h: '24–36 meses', e: 'Medio', i: 'Medio-Alto', p: 'Medio ambiente' }
    ],
    retos: [
      { practice: false, title: 'Tensión turismo vs habitabilidad', text: 'Modelo económico dependiente del turismo genera deterioro residencial. Sin regulación, el patrimonio se convierte en activo vaciado.' },
      { practice: false, title: 'Patrimonio como limitador energético', text: 'Protección UNESCO genera valor cultural pero bloquea transición energética. Falta marco de excepción adaptado.' },
      { practice: true, title: 'Santiago de Compostela · Gestión turística integrada', text: 'Tasa turística + regulación VUT + revitalización residencial. Aplicable directamente a Salamanca.', peer: 'Casco Histórico con ocupación residencial recuperada' },
      { practice: true, title: 'Toledo · Fotovoltaica patrimonial', text: 'Protocolo consensuado con Patrimonio para instalación solar invisible. Referente en ciudades UNESCO españolas.', peer: 'Modelo técnico y regulatorio validado' }
    ]
  },

  santander: {
    name: 'Santander', region: 'Cantabria', area: '35,1 km²', pop: '170.423',
    tags: ['Capital Cantabria', 'Costa'],
    score: 63, status: 'warn', statusText: 'En observación',
    tesis: 'El municipio posee activos climáticos pasivos que no está capitalizando activamente: viento atlántico, nubosidad y ría son ventajas competitivas aún no monetizadas.',
    ejecutivo: 'Clima atlántico y geografía costera generan ventajas ambientales pasivas (mejor calidad del aire del grupo, menor isla de calor) sin intervención activa. Retraso energético acumulado (-10 vs peers) y topografía que produce desigualdad de acceso entre barrios altos y bajos. Estacionalidad extrema: +42% ocupación residencial en agosto vs enero.',
    peers: { vs: '-1 pt', vsClass: 'down', ccaa: '+2 pts', ccaaClass: 'up', yr: '+1 pt', yrClass: 'up', rank: '4 / 8' },
    pillars: [
      { name: 'Medio ambiente', score: 69, status: 'ok', statusText: 'Aceptable', delta: '↑ +1', vsPeers: '+2', icon: 'leaf' },
      { name: 'Energía', score: 54, status: 'risk', statusText: 'En retraso', delta: '↑ +2', vsPeers: '-10', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 61, status: 'warn', statusText: 'Bajo presión', delta: '↓ -2', vsPeers: '-4', icon: 'home' },
      { name: 'Movilidad', score: 68, status: 'ok', statusText: 'Aceptable', delta: '↑ +1', vsPeers: '+3', icon: 'compass' },
      { name: 'Servicios públicos', score: 63, status: 'ok', statusText: 'Aceptable', delta: '→ 0', vsPeers: '+7', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '24,8', unit: '%', trend: 'flat', trendText: '→ estable', delta: '13,1 m²/hab + fachada litoral', interp: 'El litoral compensa déficit interior. Desigualdad entre zonas altas y bajas del municipio.' },
      { name: 'Calidad del aire (NO₂)', value: '26', unit: 'µg/m³', trend: 'up-good', trendText: '↓ -1%', delta: 'viento atlántico favorable', interp: 'Ventilación natural excepcional. Puntos críticos en Castilla-Hermida por tráfico portuario.' },
      { name: 'Islas de calor urbanas', value: '+2,8', unit: '°C', trend: 'flat', trendText: 'Estable', delta: 'bajo diferencial por clima', interp: 'Clima atlántico modera el efecto. No es un riesgo sanitario prioritario como en interior.' },
      { name: 'Potencial solar en tejados', value: '142', unit: 'GWh/año', trend: 'flat', trendText: 'Sin ejecución', delta: 'nubosidad reduce rendimiento', interp: 'Irradiación más baja del peer group pero potencial técnico todavía significativo. Eólico como alternativa.' },
      { name: 'Accesibilidad a servicios', value: '73', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'forma urbana alargada', interp: 'Topografía y forma lineal dificultan cobertura homogénea. Barrios altos con déficit.' },
      { name: 'Cobertura transporte público', value: '79', unit: '%', trend: 'up-good', trendText: '↑ +2 pp', delta: 'TUS urbano municipal', interp: 'Buena cobertura urbana. Cercanías conecta con área metropolitana de forma eficaz.' },
      { name: 'Expansión urbana', value: '+0,5', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'suelo escaso por topografía', interp: 'Límites físicos naturales. Crecimiento hacia Camargo y Piélagos (área metropolitana).' },
      { name: 'Vivienda vacía detectable', value: '14,2', unit: '%', trend: 'up-warn', trendText: '↑ +0,9 pp', delta: 'segunda residencia estival', interp: 'Alta proporción de segunda vivienda. Ocupación muy estacional detectable por iluminación nocturna.' }
    ],
    history: [ [2021, 61], [2022, 62], [2023, 62], [2024, 63], [2025, 63] ],
    histTrend: '↑ +2 pts', histTrendClass: 'ok',
    insights: [
      { title: 'Viento, nubosidad y ría son ventajas no monetizadas', text: 'Santander tiene la <strong>mejor calidad del aire, la menor isla de calor y viento atlántico sostenido</strong> del peer group — todos activos climáticos pasivos. Ninguno está siendo capitalizado activamente vía eólica urbana, narrativa de salud o posicionamiento competitivo.' },
      { title: 'Estacionalidad intensa detectable', text: 'Iluminación nocturna muestra <strong>+42% ocupación en agosto vs enero</strong>. Segunda residencia y turismo generan picos estacionales.' },
      { title: 'Energía: potencial eólico infrautilizado', text: 'Irradiación solar limitada pero <strong>potencial eólico urbano detectable</strong>. Ningún peer lo tiene.' },
      { title: 'Topografía restringe equidad', text: 'Cueto y Monte con menor accesibilidad. <strong>La pendiente es el principal factor de desigualdad</strong> territorial.' }
    ],
    alerts: [
      { level: 'high', text: 'Retraso estructural en transición energética', zone: 'Todo el ejido' },
      { level: 'med', text: 'Estacionalidad extrema en demanda residencial', zone: 'El Sardinero · Magdalena' },
      { level: 'med', text: 'Accesibilidad reducida en barrios altos', zone: 'Cueto · Monte · San Román' },
      { level: 'med', text: 'Presión turística creciente en centro costero', zone: 'El Sardinero · Cabo Mayor' }
    ],
    recs: [
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Estudio de eólica urbana integrada', desc: 'Evaluar potencial eólico en edificios altos y fachada portuaria. Santander puede liderar un vector energético único — ningún peer tiene este activo.', h: '12–18 meses', e: 'Medio', i: 'Alto', p: 'Energía' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Cobertura mecanizada para barrios altos', desc: 'Ascensores urbanos, teleféricos o rampas mecánicas en Cueto y Monte. Salvar la pendiente como factor de desigualdad.', h: '24–36 meses', e: 'Alto', i: 'Medio-Alto', p: 'Mov + Serv' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Plan de infraestructura escalable por temporada', desc: 'Dimensionar servicios públicos para demanda estival sin sobrecoste invernal. Modelo modular y reversible.', h: '18 meses', e: 'Medio', i: 'Medio', p: 'Servicios' },
      { prio: 'media', prioText: 'Prioridad media', title: 'Valorización del clima atlántico como activo', desc: 'Capitalizar ventaja climática pasiva en narrativa de sostenibilidad y atracción de inversión. Diferencial vs peers de interior.', h: '6–12 meses', e: 'Bajo', i: 'Medio', p: 'Transversal' }
    ],
    retos: [
      { practice: false, title: 'Geografía como limitador y oportunidad', text: 'Topografía costera genera desigualdad en accesibilidad pero también capital climático único. El diseño del Snapshot debe contemplar ambos efectos.' },
      { practice: false, title: 'Estacionalidad funcional', text: 'El municipio opera en dos velocidades: estival y residencial. Los servicios dimensionados para media anual saturan en agosto y subocupan en invierno.' },
      { practice: true, title: 'Rotterdam · Eólica urbana integrada', text: 'Torres eólicas integradas en arquitectura. Modelo técnico aplicable a fachada portuaria de Santander.', peer: 'Referencia en eólica urbana' },
      { practice: true, title: 'San Sebastián · Gestión de segunda vivienda', text: 'Fiscalidad diferenciada y movilización de vivienda vacía estacional. Aplicable al perfil residencial de El Sardinero.', peer: 'Modelo regulatorio costero replicable' }
    ]
  },

  burgos: {
    name: 'Burgos', region: 'Castilla y León', area: '107,1 km²', pop: '174.486',
    tags: ['Capital provincial', 'Industria logística'],
    score: 59, status: 'risk', statusText: 'En riesgo',
    tesis: 'El municipio opera como dos ciudades en tensión: un centro histórico que se vacía y una periferia industrial que se expande, agotando suelo rural sin resolver la despoblación central.',
    ejecutivo: 'Único municipio del peer group con deterioro sostenido: -4 pts en 4 ciclos consecutivos. Expansión industrial extensiva (+128 ha/año) coexiste con vaciado del centro histórico (+1,4 pp/año de vacancia). Brecha energética crítica (-12 vs peers). Sin intervención estructural, la distancia con peers seguirá ampliándose.',
    peers: { vs: '-5 pts', vsClass: 'down', ccaa: '0 pts', ccaaClass: 'flat', yr: '-3 pts', yrClass: 'down', rank: '6 / 8' },
    pillars: [
      { name: 'Medio ambiente', score: 64, status: 'ok', statusText: 'Aceptable', delta: '↓ -2', vsPeers: '-3', icon: 'leaf' },
      { name: 'Energía', score: 52, status: 'risk', statusText: 'En retraso', delta: '↑ +1', vsPeers: '-12', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 58, status: 'warn', statusText: 'Bajo presión', delta: '↓ -4', vsPeers: '-7', icon: 'home' },
      { name: 'Movilidad', score: 65, status: 'ok', statusText: 'Aceptable', delta: '↓ -1', vsPeers: '0', icon: 'compass' },
      { name: 'Servicios públicos', score: 56, status: 'warn', statusText: 'En retraso', delta: '↓ -3', vsPeers: '0', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '25,1', unit: '%', trend: 'down', trendText: '↓ -0,4 pp', delta: '14,4 m²/hab · riberas y entorno rural', interp: 'Buena cobertura agregada, con concentración en riberas del Arlanzón. Déficit en polígonos industriales.' },
      { name: 'Calidad del aire (NO₂)', value: '34', unit: 'µg/m³', trend: 'up-bad', trendText: '↑ +4%', delta: 'cerca de límite UE actual', interp: 'Emisiones industriales y tráfico N-1. Episodios de superación en inversiones térmicas invernales.' },
      { name: 'Islas de calor urbanas', value: '+4,8', unit: '°C', trend: 'up-warn', trendText: '↑ +0,8 °C/déc', delta: 'diferencial moderado-alto', interp: 'Mitigado por altitud y clima continental. Focos en polígonos de Villalonquéjar y Gamonal.' },
      { name: 'Potencial solar en tejados', value: '224', unit: 'GWh/año', trend: 'flat', trendText: '1,2% ejecutado', delta: 'alta irradiación meseta', interp: 'Potencial alto por irradiación continental. Ejecución casi nula. Logística industrial con recorrido.' },
      { name: 'Accesibilidad a servicios', value: '64', unit: '%', trend: 'down', trendText: '↓ -2 pp', delta: 'forma urbana dispersa', interp: 'Gamonal-Capiscol compensa la dispersión del sur. Barrios periféricos con déficit: Villímar, Cortes.' },
      { name: 'Cobertura transporte público', value: '74', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'red urbana municipal', interp: 'Cobertura estable pero frecuencias bajas fuera del centro. Polígonos industriales mal servidos.' },
      { name: 'Expansión urbana', value: '+1,2', unit: '%', trend: 'up-bad', trendText: '↑ +128 ha', delta: 'mayormente polígonos logísticos', interp: 'Crecimiento acelerado en suelo industrial (Villafría, Villalonquéjar). Modelo extensivo de baja densidad.' },
      { name: 'Vivienda vacía detectable', value: '12,8', unit: '%', trend: 'up-warn', trendText: '↑ +1,4 pp', delta: 'despoblación del centro', interp: 'Tendencia creciente preocupante. Casco histórico y primeros ensanches con vaciado demográfico.' }
    ],
    history: [ [2021, 63], [2022, 62], [2023, 62], [2024, 61], [2025, 59] ],
    histTrend: '↓ -4 pts', histTrendClass: 'risk',
    insights: [
      { title: 'Deterioro sostenido 4 años — único del peer group', text: 'Score cayendo <strong>-4 puntos desde 2021</strong>. Único municipio del peer group con tendencia negativa continuada. Sin intervención estructural, Burgos cruza la frontera de 55 puntos en el próximo ciclo y entra en zona crítica.' },
      { title: 'Expansión industrial descontrolada', text: '+128 ha/año en <strong>polígonos logísticos de baja densidad</strong>. Modelo extensivo con alta presión ambiental y sobre suelo rural.' },
      { title: 'Vaciado residencial del centro', text: 'Vivienda vacía +1,4 pp/año. <strong>El casco histórico pierde población real</strong> mientras la expansión va a periferia industrial.' },
      { title: 'Brecha energética crítica', text: 'Energía en 52 — <strong>12 puntos bajo peers</strong>. Irradiación continental alta pero solo 1,2% ejecutado.' }
    ],
    alerts: [
      { level: 'high', text: 'Deterioro sostenido del score en 4 ciclos consecutivos', zone: 'Municipio completo' },
      { level: 'high', text: 'Expansión industrial extensiva vs despoblación del centro', zone: 'Villafría · Villalonquéjar vs Casco Histórico' },
      { level: 'high', text: 'NO₂ al límite de umbral UE actual', zone: 'Eje N-1 · Industria' },
      { level: 'med', text: 'Retraso estructural en transición energética', zone: 'Todo el ejido' },
      { level: 'med', text: 'Frecuencia baja de transporte público en polígonos', zone: 'Villafría · Villalonquéjar' }
    ],
    recs: [
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Freno a la expansión industrial extensiva', desc: 'Densificar polígonos existentes antes de habilitar nuevos. Salvar suelo rural y contener la huella ambiental del crecimiento logístico. Sin esta medida, el deterioro continuará.', h: '12–24 meses', e: 'Alto', i: 'Muy alto', p: 'Territorio' },
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Plan de regeneración del centro histórico', desc: 'Incentivos fiscales y rehabilitación residencial. Revertir vaciado mediante atracción de residentes y usos mixtos. El centro necesita intervención o se pierde.', h: '24–36 meses', e: 'Alto', i: 'Alto', p: 'Vivienda' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Plan solar sobre polígonos logísticos', desc: 'Grandes cubiertas de logística son el mayor potencial solar del municipio. Convenio con operadores para autoconsumo distribuido y cierre de brecha energética.', h: '12–18 meses', e: 'Medio', i: 'Alto', p: 'Energía' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Monitorización y plan de reducción de NO₂', desc: 'Red de sensores en eje N-1 + medidas de baja emisión. Anticiparse al cumplimiento de directiva UE 2030 antes que la norma lo exija.', h: '18 meses', e: 'Medio', i: 'Medio-Alto', p: 'MA' }
    ],
    retos: [
      { practice: false, title: 'Dos ciudades en tensión', text: 'Un centro histórico que se vacía y una periferia industrial que se expande. El modelo actual agota suelo rural sin resolver la despoblación central.' },
      { practice: false, title: 'Tendencia negativa persistente', text: 'Único peer con deterioro continuo. Sin intervención estructural, la brecha vs peers seguirá ampliándose.' },
      { practice: true, title: 'Vitoria-Gasteiz · Contención del crecimiento', text: 'Modelo de crecimiento hacia dentro, densificación controlada y freno total a suelo nuevo. Directamente aplicable.', peer: 'Expansión anual: +0,2% (Burgos: +1,2%)' },
      { practice: true, title: 'Zaragoza · PLAZA logística sostenible', text: 'Polígonos logísticos con solar en cubierta y compensación ambiental obligatoria. Modelo técnico y regulatorio replicable.', peer: 'Referente de logística descarbonizada' }
    ]
  },

  malaga: {
    name: 'Málaga', region: 'Andalucía', area: '398,3 km²', pop: '591.637',
    tags: ['Capital provincial', 'Polo tecnológico', 'Turismo'],
    score: 67, status: 'warn', statusText: 'Aceptable',
    tesis: 'La isla de calor crece +2,1°C/década y genera impacto sanitario documentado, mientras la expansión costera continúa sin freno — la adaptación climática es el vector dominante.',
    ejecutivo: 'Vanguardia tecnológica y energética (+10 vs peers en Energía) conviviendo con vulnerabilidad climática extrema: +7,1°C de isla de calor, la máxima del estudio ampliado. Liderazgo solar en ejecución (14%) y mejor movilidad del grupo, pero terciarización residencial acelerada del centro y expansión costera sostenida sobre suelo protegido.',
    peers: { vs: '+2 pts', vsClass: 'up', ccaa: '+6 pts', ccaaClass: 'up', yr: '+3 pts', yrClass: 'up', rank: 'Fuera de grupo peer' },
    pillars: [
      { name: 'Medio ambiente', score: 63, status: 'ok', statusText: 'Aceptable', delta: '→ 0', vsPeers: '-4', icon: 'leaf' },
      { name: 'Energía', score: 74, status: 'ok', statusText: 'Bueno', delta: '↑ +6', vsPeers: '+10', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 58, status: 'warn', statusText: 'Bajo presión', delta: '↓ -3', vsPeers: '-7', icon: 'home' },
      { name: 'Movilidad', score: 71, status: 'ok', statusText: 'Bueno', delta: '↑ +4', vsPeers: '+6', icon: 'compass' },
      { name: 'Servicios públicos', score: 68, status: 'ok', statusText: 'Aceptable', delta: '↑ +2', vsPeers: '+12', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '19,8', unit: '%', trend: 'flat', trendText: '→ estable', delta: '8,6 m²/hab · bajo OMS', interp: 'Déficit estructural de verde urbano. Topografía y clima seco limitan vegetación no irrigada.' },
      { name: 'Calidad del aire (NO₂)', value: '28', unit: 'µg/m³', trend: 'up-good', trendText: '↓ -3%', delta: 'mejora por electrificación MT', interp: 'Mejora sostenida gracias a flota electrificada y metro. Picos puntuales en eje A-7 y puerto.' },
      { name: 'Islas de calor urbanas', value: '+7,1', unit: '°C', trend: 'up-bad', trendText: '↑ +2,1 °C/déc', delta: 'mayor diferencial del estudio', interp: 'Extrema vulnerabilidad climática. Olas de calor ya generan impacto sanitario documentado.' },
      { name: 'Potencial solar en tejados', value: '812', unit: 'GWh/año', trend: 'up-good', trendText: '↑ 14% ejecutado', delta: 'irradiación excepcional', interp: 'Mejor potencial solar del conjunto. Ejecución creciente, apoyada por Málaga TechPark.' },
      { name: 'Accesibilidad a servicios', value: '69', unit: '%', trend: 'up-good', trendText: '↑ +2 pp', delta: 'población a 15 min caminando', interp: 'Mejora por expansión de red metro y bus eléctrico. Periferia norte sigue con déficit.' },
      { name: 'Cobertura transporte público', value: '82', unit: '%', trend: 'up-good', trendText: '↑ +4 pp', delta: 'metro + EMT + cercanías', interp: 'Metro y cercanías extienden cobertura efectiva. Mejor ratio del peer ampliado.' },
      { name: 'Expansión urbana', value: '+1,4', unit: '%', trend: 'up-bad', trendText: '↑ +215 ha', delta: 'presión costera sostenida', interp: 'Expansión acelerada en corona este y oeste. Riesgo creciente sobre suelo agrícola y áreas naturales.' },
      { name: 'Vivienda vacía detectable', value: '11,8', unit: '%', trend: 'down', trendText: '↓ -0,6 pp', delta: 'tensión turística fuerte', interp: 'Descenso por absorción turística. Centro con fuerte terciarización y desplazamiento residencial.' }
    ],
    history: [ [2021, 62], [2022, 64], [2023, 65], [2024, 66], [2025, 67] ],
    histTrend: '↑ +5 pts', histTrendClass: 'ok',
    insights: [
      { title: 'La adaptación climática no es opcional: es el vector dominante', text: '<strong>+7,1°C de isla de calor, +2,1°C/década</strong>. Málaga es ya el municipio más vulnerable del estudio a impactos sanitarios por calor. El resto de esfuerzos — por exitosos que sean — pierde sentido si la ciudad se vuelve inhabitable en verano.' },
      { title: 'Liderazgo energético emergente', text: 'Energía 74, <strong>mayor crecimiento del grupo</strong>. Málaga TechPark + irradiación excepcional generan tracción única.' },
      { title: 'Terciarización residencial del centro', text: 'Vacancia cayendo por absorción turística. <strong>Centro en proceso de terciarización</strong> con desplazamiento residencial.' },
      { title: 'Fuera del grupo peer natural', text: '591k habitantes y perfil costero-turístico desencajan del peer de interior. <strong>Requiere grupo Sur-costero</strong>.' }
    ],
    alerts: [
      { level: 'high', text: 'Vulnerabilidad climática crítica por isla de calor', zone: 'Centro histórico y barrios densos' },
      { level: 'high', text: 'Déficit estructural de verde urbano', zone: 'Periferia norte y este' },
      { level: 'med', text: 'Expansión costera acelerada sobre suelo protegido', zone: 'Corona este · Guadalhorce' },
      { level: 'med', text: 'Terciarización residencial del centro', zone: 'Centro histórico · Ensanche' }
    ],
    recs: [
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Plan de adaptación climática urbana urgente', desc: 'Red de refugios climáticos, sombras verticales, arbolado resistente a sequía. La isla de calor requiere intervención antes que cualquier otro pilar: es el vector dominante del riesgo sanitario.', h: '12–24 meses', e: 'Alto', i: 'Muy alto', p: 'MA + Salud' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Escalada del modelo solar a toda la edificación', desc: 'Mantener el liderazgo energético con objetivo 30% ejecución potencial en 5 años. Polo TechPark como vector tecnológico y de atracción de inversión.', h: '24–60 meses', e: 'Medio', i: 'Muy alto', p: 'Energía' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Control de expansión costera', desc: 'Protección de suelo agrícola del Guadalhorce y áreas naturales de la corona. Modelo de crecimiento hacia dentro como en Vitoria.', h: '18–36 meses', e: 'Alto', i: 'Alto', p: 'Territorio' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Vivienda residencial protegida en centro', desc: 'Limitar terciarización y turistización del centro histórico. Recuperar uso residencial en edificios vacíos rehabilitados.', h: '24 meses', e: 'Alto', i: 'Alto', p: 'Vivienda' }
    ],
    retos: [
      { practice: false, title: 'Vanguardia y vulnerabilidad conviviendo', text: 'Liderazgo tecnológico y energético coexiste con vulnerabilidad climática extrema y presión residencial. El score agregado oculta ambas intensidades.' },
      { practice: false, title: 'Necesidad de peer group adecuado', text: 'Málaga no es comparable con capitales medias de interior. Requiere grupo con Valencia, Alicante, Palma, Las Palmas.' },
      { practice: true, title: 'Barcelona · Refugios climáticos en red', text: 'Red de 400 refugios (bibliotecas, centros cívicos, parques) activados automáticamente ante olas de calor. Directamente aplicable.', peer: 'Modelo de protección climática urbana' },
      { practice: true, title: 'Sevilla · CartujaQanat', text: 'Enfriamiento pasivo urbano con técnicas ancestrales + tecnología. Muy relevante para climas secos cálidos.', peer: 'Referencia andaluza de mitigación térmica' }
    ]
  },

  bilbao: {
    name: 'Bilbao', region: 'País Vasco', area: '41,3 km²', pop: '346.405',
    tags: ['Área metropolitana', 'Reconversión industrial'],
    score: 74, status: 'ok', statusText: 'Bueno',
    tesis: 'El reto ya no es crecer sino distribuir valor: Bilbao concentra demanda mientras el área metropolitana requiere la misma regeneración que se logró en el núcleo hace 20 años.',
    ejecutivo: 'Referente internacional de reconversión post-industrial. Modelo de crecimiento hacia dentro consolidado (+0,1% expansión), liderazgo absoluto en movilidad (81) y fortalezas distribuidas en los 5 pilares. Tensión residencial por alto atractivo urbano con vacancia en 8,4%, muy por debajo de la media nacional. Deuda ambiental industrial aún por remediar en Zorrozaurre.',
    peers: { vs: '+13 pts', vsClass: 'up', ccaa: '+7 pts', ccaaClass: 'up', yr: '+2 pts', yrClass: 'up', rank: 'Fuera de grupo peer' },
    pillars: [
      { name: 'Medio ambiente', score: 76, status: 'ok', statusText: 'Bueno', delta: '↑ +3', vsPeers: '+9', icon: 'leaf' },
      { name: 'Energía', score: 71, status: 'ok', statusText: 'Bueno', delta: '↑ +4', vsPeers: '+7', icon: 'zap' },
      { name: 'Territorio y vivienda', score: 74, status: 'ok', statusText: 'Bueno', delta: '↑ +2', vsPeers: '+9', icon: 'home' },
      { name: 'Movilidad', score: 81, status: 'ok', statusText: 'Excelente', delta: '↑ +1', vsPeers: '+16', icon: 'compass' },
      { name: 'Servicios públicos', score: 70, status: 'ok', statusText: 'Bueno', delta: '→ 0', vsPeers: '+14', icon: 'building' }
    ],
    kpis: [
      { name: 'Cobertura vegetal urbana', value: '31,4', unit: '%', trend: 'up-good', trendText: '↑ +2,1 pp', delta: '17,8 m²/hab · recuperación continua', interp: 'Reconversión industrial liberó suelos hoy regenerados. Ría como corredor verde central transformador.' },
      { name: 'Calidad del aire (NO₂)', value: '22', unit: 'µg/m³', trend: 'up-good', trendText: '↓ -4%', delta: 'bajo directiva UE 2030', interp: 'Reducción sostenida tras descarbonización industrial. Viento cantábrico contribuye a la dispersión.' },
      { name: 'Islas de calor urbanas', value: '+3,2', unit: '°C', trend: 'flat', trendText: 'Estable', delta: 'contenido por clima y ría', interp: 'Clima húmedo atlántico y ría generan corredores de ventilación eficaces.' },
      { name: 'Potencial solar en tejados', value: '245', unit: 'GWh/año', trend: 'up-good', trendText: '↑ 9% ejecutado', delta: 'creciente a pesar de nubosidad', interp: 'Ejecución progresiva. Edificios municipales lideran adopción. Complemento con geotermia en cota baja.' },
      { name: 'Accesibilidad a servicios', value: '86', unit: '%', trend: 'up-good', trendText: '↑ +2 pp', delta: 'compacidad metropolitana', interp: 'Densidad y metro garantizan altísima accesibilidad. Referente del estudio ampliado.' },
      { name: 'Cobertura transporte público', value: '94', unit: '%', trend: 'up-good', trendText: '↑ +1 pp', delta: 'metro + BUS + cercanías + tranvía', interp: 'Mejor cobertura del grupo ampliado. Sistema multimodal plenamente integrado.' },
      { name: 'Expansión urbana', value: '+0,1', unit: '%', trend: 'flat', trendText: '→ estable', delta: 'saturación territorial', interp: 'Suelo saturado por geografía. Crecimiento ocurre por regeneración interior, no por expansión externa.' },
      { name: 'Vivienda vacía detectable', value: '8,4', unit: '%', trend: 'up-good', trendText: '↓ -0,8 pp', delta: 'mercado tensionado', interp: 'Por debajo de media nacional. Mercado tensionado por limitación de suelo y atractivo urbano.' }
    ],
    history: [ [2021, 70], [2022, 71], [2023, 72], [2024, 73], [2025, 74] ],
    histTrend: '↑ +4 pts', histTrendClass: 'ok',
    insights: [
      { title: 'El éxito del núcleo exige distribuir valor al entorno', text: 'Bilbao ha completado su reconversión y hoy concentra demanda, servicios y atractivo. <strong>Barakaldo, Sestao y la margen izquierda requieren hoy la misma regeneración</strong> que se logró en el núcleo hace 20 años. Sin esta extensión, la tensión residencial y la desigualdad metropolitana crecerán.' },
      { title: 'Liderazgo absoluto en movilidad', text: 'Movilidad 81, <strong>máximo del estudio ampliado</strong>. Integración multimodal metropolitana.' },
      { title: 'Modelo de crecimiento hacia dentro consolidado', text: 'Expansión casi nula (+0,1%). Todo el crecimiento por <strong>regeneración de suelo industrial obsoleto</strong>.' },
      { title: 'Geotermia urbana como vector único', text: 'Condiciones geológicas permiten geotermia en barrios bajos. <strong>Vector único no disponible en peers</strong>.' }
    ],
    alerts: [
      { level: 'med', text: 'Tensión en mercado de vivienda por baja vacancia', zone: 'Abando · Indautxu · Casco Viejo' },
      { level: 'med', text: 'Saturación en corredores del metro centro', zone: 'Líneas 1 y 2 en hora punta' },
      { level: 'low', text: 'Deuda histórica de contaminación en subsuelo industrial', zone: 'Zorrozaurre · Deusto norte' }
    ],
    recs: [
      { prio: 'max', prioText: 'Prioridad máxima', title: 'Programa de vivienda asequible metropolitana', desc: 'Extender el esfuerzo residencial al área metropolitana (Barakaldo, Sestao). Descomprimir mercado central sin expandir Bilbao. La tensión residencial requiere respuesta inmediata.', h: '24 meses', e: 'Alto', i: 'Alto', p: 'Vivienda' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Plan de geotermia urbana en barrios bajos', desc: 'Complementar solar con vector único. Zorrozaurre y Abandoibarra como pilotos. Diferenciación energética vs peers.', h: '24–36 meses', e: 'Alto', i: 'Alto', p: 'Energía' },
      { prio: 'alta', prioText: 'Prioridad alta', title: 'Descongestión de corredores metro saturados', desc: 'Refuerzo de frecuencias o ampliación de material móvil. Mantener el liderazgo en movilidad antes de que se erosione.', h: '18 meses', e: 'Alto', i: 'Medio-Alto', p: 'Movilidad' },
      { prio: 'media', prioText: 'Prioridad media', title: 'Certificación del modelo "Reconversión sostenible"', desc: 'Monetizar el know-how mediante consultoría internacional. Modelo exportable a puertos industriales del Mediterráneo.', h: '12 meses', e: 'Bajo', i: 'Medio', p: 'Transversal' }
    ],
    retos: [
      { practice: false, title: 'Gestionar el éxito', text: 'Tensión residencial y saturación son síntomas de atractivo urbano alto. El reto es distribuir valor al área metropolitana, no solo concentrarlo.' },
      { practice: false, title: 'Deuda ambiental industrial', text: 'Décadas de suelo contaminado quedan por remediar, particularmente en Zorrozaurre. Pasivo no visible en el score agregado.' },
      { practice: true, title: 'Hamburgo · HafenCity', text: 'Regeneración portuaria con estándar "GOLD". Pariente conceptual de Zorrozaurre, con mejor integración residencial.', peer: 'Modelo de regeneración portuaria avanzada' },
      { practice: true, title: 'Lyon · Gobernanza metropolitana fiscal', text: 'Metrópole de Lyon con capacidad fiscal y ejecutiva propia. Aplicable al Bilbao Metropolitano.', peer: 'Gobernanza metropolitana consolidada' }
    ]
  }
};

window.PEER_GROUP = ['vitoria','bilbao','pamplona','malaga','valladolid','santander','salamanca','burgos'];
window.PEER_LABELS = {
  valladolid: 'Valladolid', vitoria: 'Vitoria-Gasteiz', pamplona: 'Pamplona',
  salamanca: 'Salamanca', santander: 'Santander', burgos: 'Burgos',
  malaga: 'Málaga', bilbao: 'Bilbao'
};

window.PILLAR_ICONS = {
  leaf: '<path d="M12 3v18M4.5 9.5C8 9.5 12 6 12 3c0 3 4 6.5 7.5 6.5M6 15c3 0 6-2 6-4 0 2 3 4 6 4"/>',
  zap: '<path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>',
  home: '<path d="M3 21V10l9-7 9 7v11M9 21v-8h6v8"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
  building: '<path d="M4 21V7l8-4 8 4v14M4 13h16M9 21V13M15 21V13"/>'
};
