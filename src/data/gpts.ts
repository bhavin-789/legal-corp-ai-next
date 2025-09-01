export interface GPT {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isPro?: boolean;
  isPopular?: boolean;
}

export const gpts: GPT[] = [
  {
    id: "civil-contracts",
    name: "Especialista en Contratos Civiles",
    description: "Experto en redacción y revisión de contratos civiles según el Código Civil boliviano. Ideal para arrendamientos, compraventa y servicios.",
    category: "Civil",
    tags: ["Contratos", "Arrendamiento", "Compraventa", "Servicios"],
    isPopular: true
  },
  {
    id: "civil-property",
    name: "Derecho de Propiedad",
    description: "Asistente especializado en derechos reales, propiedad inmobiliaria, posesiones y servidumbres según la legislación boliviana.",
    category: "Civil",
    tags: ["Propiedad", "Inmuebles", "Posesión", "Servidumbres"],
    isPro: true
  },
  {
    id: "civil-family",
    name: "Derecho Familiar",
    description: "Experto en derecho de familia, incluyendo matrimonio, divorcio, patria potestad, sucesiones y alimentos.",
    category: "Civil",
    tags: ["Familia", "Matrimonio", "Divorcio", "Sucesiones"],
    isPopular: true
  },
  {
    id: "civil-obligations",
    name: "Obligaciones y Responsabilidad",
    description: "Especialista en contratos, cuasicontratos, delitos y cuasidelitos según el Libro Segundo del Código Civil.",
    category: "Civil",
    tags: ["Obligaciones", "Contratos", "Responsabilidad", "Daños"],
  },
  {
    id: "penal-defense",
    name: "Defensa Penal",
    description: "Asistente penal especializado en defensa de imputados, análisis de tipos penales y estrategias de defensa.",
    category: "Penal",
    tags: ["Defensa", "Imputados", "Tipos Penales", "Estrategia"],
    isPopular: true
  },
  {
    id: "penal-prosecution",
    name: "Acusación Penal",
    description: "Experto en derecho penal procesal, elaboración de acusaciones fiscales y fundamentación jurídica.",
    category: "Penal",
    tags: ["Acusación", "Fiscalía", "Proceso Penal", "Fundamentación"],
    isPro: true
  },
  {
    id: "penal-criminal",
    name: "Derecho Penal Sustantivo",
    description: "Especialista en análisis de tipos penales, elementos del delito y circunstancias modificatorias de responsabilidad.",
    category: "Penal",
    tags: ["Tipos Penales", "Delitos", "Responsabilidad", "Circunstancias"],
  },
  {
    id: "labor-contracts",
    name: "Contratos Laborales",
    description: "Experto en derecho laboral boliviano, contratos de trabajo, desahucio y relaciones laborales.",
    category: "Laboral",
    tags: ["Contratos Laborales", "Desahucio", "Relaciones Laborales", "Seguridad Social"],
    isPopular: true
  },
  {
    id: "labor-disputes",
    name: "Conflictos Laborales",
    description: "Asistente en conflictos individuales y colectivos de trabajo, juicios laborales y conciliaciones.",
    category: "Laboral",
    tags: ["Conflictos", "Juicios Laborales", "Conciliación", "Sindicatos"],
  },
  {
    id: "labor-social-security",
    name: "Seguridad Social",
    description: "Especialista en ley de seguridad social, AFPs, riesgos profesionales y prestaciones de corto y largo plazo.",
    category: "Laboral",
    tags: ["Seguridad Social", "AFP", "Riesgos", "Prestaciones"],
    isPro: true
  },
  {
    id: "tax-income",
    name: "Impuesto a las Utilidades",
    description: "Experto en impuesto a las utilidades de las empresas, deducciones permitidas y planificación tributaria.",
    category: "Tributario",
    tags: ["IUE", "Utilidades", "Deducciones", "Planificación"],
    isPopular: true
  },
  {
    id: "tax-vat",
    name: "IVA y Transacciones",
    description: "Asistente especializado en Impuesto al Valor Agregado, facturación y transacciones comerciales.",
    category: "Tributario",
    tags: ["IVA", "Facturación", "Transacciones", "Comercio"],
  },
  {
    id: "tax-customs",
    name: "Aduanas e Importaciones",
    description: "Experto en derecho aduanero, importaciones, exportaciones y regímenes aduaneros especiales.",
    category: "Tributario",
    tags: ["Aduanas", "Importaciones", "Exportaciones", "Regímenes"],
    isPro: true
  },
  {
    id: "constitutional-rights",
    name: "Derechos Fundamentales",
    description: "Especialista en derechos constitucionales, acciones de libertad, amparo constitucional y garantías jurisdiccionales.",
    category: "Constitucional",
    tags: ["Derechos", "Acción de Libertad", "Amparo", "Garantías"],
    isPopular: true
  },
  {
    id: "constitutional-processes",
    name: "Procesos Constitucionales",
    description: "Asistente en procesos constitucionales, recursos directos e indirectos y jurisprudencia constitucional.",
    category: "Constitucional",
    tags: ["Procesos", "Recursos", "Jurisprudencia", "Tribunal Constitucional"],
    isPro: true
  },
  {
    id: "commercial-companies",
    name: "Derecho Societario",
    description: "Experto en constitución de sociedades, transformaciones, fusiones y disolución de empresas.",
    category: "Comercial",
    tags: ["Sociedades", "Constitución", "Transformación", "Fusión"],
    isPopular: true
  },
  {
    id: "commercial-banking",
    name: "Derecho Bancario",
    description: "Asistente especializado en contratos bancarios, operaciones financieras y regulación del sistema financiero.",
    category: "Comercial",
    tags: ["Bancario", "Contratos", "Operaciones", "Regulación"],
  },
  {
    id: "commercial-intellectual",
    name: "Propiedad Intelectual",
    description: "Experto en derechos de autor, marcas, patentes y protección de propiedad intelectual en Bolivia.",
    category: "Comercial",
    tags: ["Propiedad Intelectual", "Derechos de Autor", "Marcas", "Patentes"],
    isPro: true
  },
  {
    id: "administrative-procedures",
    name: "Procedimientos Administrativos",
    description: "Especialista en derecho administrativo, procedimientos ante la administración pública y recursos administrativos.",
    category: "Administrativo",
    tags: ["Procedimientos", "Administración Pública", "Recursos", "Trámites"],
  },
  {
    id: "administrative-contracts",
    name: "Contratos Administrativos",
    description: "Asistente en contratos de la administración pública, licitaciones y regulación de contrataciones estatales.",
    category: "Administrativo",
    tags: ["Contratos Públicos", "Licitaciones", "Contrataciones", "Estado"],
    isPro: true
  }
];