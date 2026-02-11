// utils/constants.ts

export const ESTADOS_MEXICO = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

export const MOTIVOS_USO = [
  { value: 'reforzar', label: 'Reforzar temas donde tiene dificultad' },
  { value: 'mantener-al-dia', label: 'Mantenerlo al día con la escuela' },
  { value: 'adelantar', label: 'Adelantarlo en ciertos temas' },
  { value: 'tarea-interesante', label: 'Hacer la tarea más interesante' },
  { value: 'exámenes', label: 'Prepararlo para exámenes' },
  { value: 'gusto-aprender', label: 'Desarrollar el gusto por aprender' },
  { value: 'tiempo-libre', label: 'Aprovechar tiempo libre productivamente' },
  { value: 'otro', label: 'Otro' },
];

export const MATERIAS_APOYO = [
  { value: 'matematicas', label: 'Matemáticas' },
  { value: 'español', label: 'Español (lectura y escritura)' },
  { value: 'ambas', label: 'Ambas por igual' },
  { value: 'ninguna', label: 'Ninguna, solo busco enriquecimiento' },
];

export const TIEMPO_DEDICADO = [
  { value: '10-15', label: '10-15 minutos diarios' },
  { value: '30', label: '30 minutos diarios' },
  { value: '60', label: '1 hora diaria' },
  { value: 'fines-semana', label: 'Solo fines de semana' },
  { value: 'cuando-pueda', label: 'Cuando tenga tiempo libre' },
];

export const FAMILIARIDAD_TECNOLOGIA = [
  { value: 'muy-familiarizado', label: 'Muy familiarizado (usa tablet/computadora diario)' },
  { value: 'moderado', label: 'Moderado (la usa con supervisión)' },
  { value: 'poco', label: 'Poco (apenas está aprendiendo)' },
];

export const NECESIDADES_ESPECIALES = [
  { value: 'dislexia', label: 'Dislexia' },
  { value: 'tdah', label: 'TDAH' },
  { value: 'ninguna', label: 'Ninguna' },
  { value: 'otra', label: 'Otra' },
];

export const PLANES = [
  {
    id: 'mensual',
    nombre: 'Mensual',
    precio: 149,
    periodo: 'mes',
    descripcion: 'Facturado mensualmente',
    ahorro: null,
    destacado: false,
    activo: false,
  },
  {
    id: 'trimestral',
    nombre: 'Trimestral',
    precio: 399,
    periodo: '3 meses',
    descripcion: 'Compromiso trimestral',
    ahorro: '11%',
    precioMensual: 133,
    destacado: true,
    activo: false,
  },
  {
    id: 'anual',
    nombre: 'Anual',
    precio: 1490,
    periodo: 'año',
    descripcion: 'Compromiso anual',
    ahorro: '17%',
    precioMensual: 124,
    beneficio: '2 meses gratis',
    destacado: false,
    activo: false,
  },
  {
    id: 'trial',
    nombre: 'Prueba Gratuita',
    precio: 0,
    periodo: '14 días',
    descripcion: 'Acceso completo sin tarjeta',
    beneficios: [
      'Acceso a todas las funciones',
      'Sin tarjeta de crédito',
      'Cancela en cualquier momento',
    ],
    destacado: false,
    activo: true,
  },
];

export const TRIAL_DAYS = 14;
