// =============================================================
// UrbanSnapshot Sustentabilidad — dataset mock
// Fuentes de referencia (para la narrativa, no se consumen en runtime):
//   - Sensorización multitemporal BoldOS / capa Daredevil
//   - Señales de NO2 troposférico, LST, NDVI, superficies impermeables,
//     cuerpos de agua, densidad de generación solar distribuida
//   - Procesamiento cognitivo por capa Thot
// =============================================================

const MUNICIPIOS = {
  madrid: {
    id: "madrid",
    nombre: "Madrid",
    poblacion: 3340000,
    superficie_km2: 604.3,
    cluster: "Capital > 1M hab · clima mediterráneo continental",
    kpis: {
      aire: {
        label: "Calidad del aire",
        unidad: "µg/m³ NO₂ (media anual)",
        valor_2025: 30.1,
        serie: [48.2, 45.8, 42.1, 40.5, 38.7, 29.4, 32.6, 33.1, 31.8, 30.9, 30.1],
        optimo: 10, critico: 40, direccion: "menor_es_mejor",
        fuente: "Señales multitemporales NO₂ troposférico · Daredevil"
      },
      verde: {
        label: "Áreas verdes per cápita",
        unidad: "m²/habitante",
        valor_2025: 17.2,
        serie: [15.1, 15.3, 15.6, 15.9, 16.2, 16.4, 16.6, 16.8, 17.0, 17.1, 17.2],
        optimo: 20, critico: 5, direccion: "mayor_es_mejor",
        fuente: "NDVI multitemporal + huella construida · Daredevil"
      },
      calor: {
        label: "Islas de calor urbanas",
        unidad: "°C delta urbano-rural (verano)",
        valor_2025: 3.8,
        serie: [2.9, 3.1, 3.2, 3.3, 3.5, 3.4, 3.6, 3.7, 3.9, 3.8, 3.8],
        optimo: 1, critico: 6, direccion: "menor_es_mejor",
        fuente: "Temperatura superficial multitemporal · Daredevil"
      },
      agua: {
        label: "Riesgo hídrico e inundación",
        unidad: "índice 0–100 (0 = seguro)",
        valor_2025: 42,
        serie: [38, 39, 40, 41, 42, 44, 45, 44, 43, 42, 42],
        optimo: 10, critico: 80, direccion: "menor_es_mejor",
        fuente: "Cuerpos de agua, humedad de suelo, zonas inundables · Daredevil"
      },
      impermeable: {
        label: "Huella impermeabilizada",
        unidad: "% superficie urbana",
        valor_2025: 48.3,
        serie: [42.1, 43.0, 43.8, 44.6, 45.3, 45.9, 46.5, 47.0, 47.5, 47.9, 48.3],
        optimo: 20, critico: 70, direccion: "menor_es_mejor",
        fuente: "Clasificación de cobertura multitemporal · Daredevil"
      },
      energia: {
        label: "Eficiencia energética distribuida",
        unidad: "kWp solar / 1.000 hab",
        valor_2025: 14.8,
        serie: [1.2, 1.5, 2.1, 3.0, 4.2, 5.8, 7.4, 9.1, 11.3, 13.0, 14.8],
        optimo: 40, critico: 3, direccion: "mayor_es_mejor",
        fuente: "Detección de paneles + luces nocturnas · Daredevil"
      }
    },
    retos: [
      { titulo: "Expansión sostenida de huella impermeabilizada", severidad: "alta",
        detalle: "La superficie impermeable creció 6,2 puntos en 10 años. Sin compensación de verde proporcional, agrava el efecto isla de calor y la escorrentía urbana." },
      { titulo: "Isla de calor estructural en verano", severidad: "alta",
        detalle: "El delta térmico urbano-rural se mantiene por encima de 3,5 °C. Barrios del centro y sur muestran picos diurnos de +5 °C respecto a la periferia norte." },
      { titulo: "Baja penetración solar frente a pares mediterráneos", severidad: "media",
        detalle: "La densidad de generación distribuida está por debajo de Sevilla, Málaga y Zaragoza, con un potencial de radiación comparable." }
    ],
    fortalezas: [
      "Reducción sostenida de NO₂ (-37% desde 2015), liderada por políticas de bajas emisiones.",
      "Crecimiento neto del verde per cápita gracias a corredores verdes y parques periurbanos.",
      "Riesgo hídrico bajo-moderado y estable en el horizonte multitemporal."
    ]
  },

  barcelona: { id:"barcelona", nombre:"Barcelona", poblacion:1660000,
    kpis:{ aire:34.2, verde:7.4, calor:3.2, agua:48, impermeable:52.1, energia:18.3 } },
  valencia:  { id:"valencia",  nombre:"Valencia",  poblacion:800000,
    kpis:{ aire:28.5, verde:11.2, calor:4.1, agua:55, impermeable:42.0, energia:22.1 } },
  sevilla:   { id:"sevilla",   nombre:"Sevilla",   poblacion:685000,
    kpis:{ aire:22.8, verde:9.1, calor:5.8, agua:40, impermeable:38.5, energia:35.4 } },
  zaragoza:  { id:"zaragoza",  nombre:"Zaragoza",  poblacion:675000,
    kpis:{ aire:24.1, verde:13.0, calor:3.8, agua:60, impermeable:35.2, energia:28.7 } },
  malaga:    { id:"malaga",    nombre:"Málaga",    poblacion:580000,
    kpis:{ aire:26.3, verde:8.6, calor:4.5, agua:50, impermeable:40.1, energia:30.2 } },
  bilbao:    { id:"bilbao",    nombre:"Bilbao",    poblacion:345000,
    kpis:{ aire:28.0, verde:12.4, calor:2.1, agua:35, impermeable:54.8, energia:14.1 } }
};

// Activos Real Estate (mismo motor, unidad de análisis = polígono + radio de influencia)
const ACTIVOS = {
  cc_plaza_norte: {
    id: "cc_plaza_norte",
    nombre: "Centro Comercial Plaza Norte 2",
    tipo: "Centro comercial",
    localizacion: "San Sebastián de los Reyes, Madrid",
    superficie_m2: 118000,
    radio_influencia_km: 1.5,
    cluster: "Retail > 100k m² · corona metropolitana",
    kpis: {
      aire:        { label:"Calidad del aire",              unidad:"µg/m³ NO₂", valor_2025: 33.5,
                     serie:[44.2,42.1,39.8,38.2,36.5,28.1,30.2,31.8,32.4,33.0,33.5],
                     optimo:10, critico:40, direccion:"menor_es_mejor",
                     fuente:"NO₂ troposférico radio 1,5 km · Daredevil" },
      verde:       { label:"Verde en radio de influencia",  unidad:"% cobertura", valor_2025: 18.4,
                     serie:[22.1,21.8,21.2,20.6,20.0,19.5,19.1,18.8,18.6,18.5,18.4],
                     optimo:35, critico:5, direccion:"mayor_es_mejor",
                     fuente:"NDVI radio 1,5 km · Daredevil" },
      calor:       { label:"Isla de calor del predio",      unidad:"°C vs entorno", valor_2025: 4.6,
                     serie:[3.8,3.9,4.0,4.1,4.2,4.3,4.4,4.5,4.6,4.6,4.6],
                     optimo:1, critico:6, direccion:"menor_es_mejor",
                     fuente:"LST predio vs buffer · Daredevil" },
      agua:        { label:"Riesgo hídrico del activo",     unidad:"índice 0–100", valor_2025: 28,
                     serie:[26,26,27,27,28,28,28,28,28,28,28],
                     optimo:10, critico:80, direccion:"menor_es_mejor",
                     fuente:"Zonas inundables + escorrentía · Daredevil" },
      impermeable: { label:"Impermeabilización del predio", unidad:"% superficie", valor_2025: 82.5,
                     serie:[82.0,82.1,82.2,82.3,82.3,82.4,82.4,82.5,82.5,82.5,82.5],
                     optimo:40, critico:90, direccion:"menor_es_mejor",
                     fuente:"Cobertura de suelo del polígono · Daredevil" },
      energia:     { label:"Solar en cubiertas",            unidad:"% cubierta con PV", valor_2025: 22.0,
                     serie:[0,0,2,5,8,11,14,17,19,21,22],
                     optimo:60, critico:0, direccion:"mayor_es_mejor",
                     fuente:"Detección de paneles en cubierta · Daredevil" }
    },
    retos: [
      { titulo:"Impermeabilización cercana al máximo técnico", severidad:"alta",
        detalle:"El 82,5% del predio es impermeable. Limita drenaje natural y amplifica isla de calor local." },
      { titulo:"Pérdida de cobertura verde en 1,5 km", severidad:"media",
        detalle:"El verde en el radio de influencia cayó 3,7 puntos en 10 años por densificación residencial y logística." }
    ],
    fortalezas: [
      "Adopción solar en cubiertas con tendencia sostenida (+22 pp en 10 años).",
      "Riesgo hídrico bajo y estable."
    ]
  },
  parque_logistico: {
    id: "parque_logistico",
    nombre: "Parque Logístico Coslada",
    tipo: "Parque logístico",
    localizacion: "Coslada, Madrid",
    superficie_m2: 245000,
    radio_influencia_km: 2.0,
    cluster: "Logística > 200k m² · corredor del Henares",
    kpis: {
      aire:        { label:"Calidad del aire",              unidad:"µg/m³ NO₂", valor_2025: 38.2,
                     serie:[45.0,44.1,42.8,41.5,40.1,32.0,34.5,36.1,37.0,37.8,38.2],
                     optimo:10, critico:40, direccion:"menor_es_mejor",
                     fuente:"NO₂ troposférico radio 2 km · Daredevil" },
      verde:       { label:"Verde en radio de influencia",  unidad:"% cobertura", valor_2025: 11.2,
                     serie:[14.5,14.0,13.6,13.1,12.7,12.3,11.9,11.6,11.4,11.3,11.2],
                     optimo:35, critico:5, direccion:"mayor_es_mejor",
                     fuente:"NDVI radio 2 km · Daredevil" },
      calor:       { label:"Isla de calor del predio",      unidad:"°C vs entorno", valor_2025: 5.2,
                     serie:[4.3,4.4,4.6,4.7,4.9,5.0,5.1,5.1,5.2,5.2,5.2],
                     optimo:1, critico:6, direccion:"menor_es_mejor",
                     fuente:"LST predio vs buffer · Daredevil" },
      agua:        { label:"Riesgo hídrico del activo",     unidad:"índice 0–100", valor_2025: 45,
                     serie:[40,41,42,43,43,44,44,45,45,45,45],
                     optimo:10, critico:80, direccion:"menor_es_mejor",
                     fuente:"Zonas inundables + escorrentía · Daredevil" },
      impermeable: { label:"Impermeabilización del predio", unidad:"% superficie", valor_2025: 88.1,
                     serie:[85.0,85.5,86.0,86.4,86.8,87.1,87.4,87.7,87.9,88.0,88.1],
                     optimo:40, critico:90, direccion:"menor_es_mejor",
                     fuente:"Cobertura de suelo del polígono · Daredevil" },
      energia:     { label:"Solar en cubiertas",            unidad:"% cubierta con PV", valor_2025: 8.5,
                     serie:[0,0,0,1,2,3,4,5,6,7,8.5],
                     optimo:60, critico:0, direccion:"mayor_es_mejor",
                     fuente:"Detección de paneles en cubierta · Daredevil" }
    },
    retos: [
      { titulo:"Impermeabilización crítica", severidad:"alta",
        detalle:"88,1% impermeable, al borde del umbral de riesgo. Detona isla de calor de +5,2 °C, máxima del portfolio." },
      { titulo:"Calidad del aire en umbral EU", severidad:"alta",
        detalle:"NO₂ medio 38,2 µg/m³, a 1,8 del límite normativo europeo (40). Riesgo regulatorio creciente." },
      { titulo:"Subutilización del potencial solar de cubiertas", severidad:"media",
        detalle:"Solo 8,5% de cubierta con PV pese a 245.000 m² de superficie disponible." }
    ],
    fortalezas: [
      "Potencial de bonificación verde vía retrofit de cubiertas (hasta 60% PV técnico).",
      "Riesgo hídrico moderado y gestionable con SUDS."
    ]
  }
};

const ANIOS = [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];

const PESOS = {
  aire: 0.20, verde: 0.18, calor: 0.17,
  agua: 0.15, impermeable: 0.15, energia: 0.15
};

const KPI_ORDEN = ["aire","verde","calor","agua","impermeable","energia"];

const KPI_ICONOS = {
  aire: "🌬️", verde: "🌳", calor: "🌡️",
  agua: "💧", impermeable: "🧱", energia: "☀️"
};
