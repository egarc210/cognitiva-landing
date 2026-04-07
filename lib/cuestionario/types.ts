// ============================================
// TIPOS DE DATOS DEL CUESTIONARIO COGNITIVA
// ============================================

export type EstiloAprendizaje = 'visual' | 'verbal' | 'kinestesico' | 'multimodal';
export type NivelAcademico = 'avanzado' | 'nivel' | 'refuerzo';
export type Genero = 'niño' | 'niña' | 'prefiero_no_decir';
export type Supervision = 'familia' | 'maestro' | 'solo' | 'otro';
export type TipoEscuela = 'publica' | 'privada' | 'homeschool';
export type ZonaTipo = 'urbana' | 'suburbana' | 'rural';

export type Interes = 
  | 'deportes'
  | 'arte'
  | 'lectura'
  | 'tecnologia'
  | 'ciencia'
  | 'musica'
  | 'animales'
  | 'construccion'
  | 'cocina'
  | 'matematicas';

export interface PerfilDemografico {
  nombre: string;
  apellidos?: string;
  edad: number;
  grado: string;
  genero?: Genero;
  escuela: {
    nombre?: string;
    tipo?: TipoEscuela;
    homeschool: boolean;
  };
  ubicacion: {
    codigoPostal?: string;
    ciudad?: string;
    estado?: string;
    zona?: ZonaTipo;
  };
  supervision: Supervision;
}

export interface EstiloAprendizajeScore {
  visual_score: number;
  verbal_score: number;
  kinestesico_score: number;
  dominante: EstiloAprendizaje;
  secundario?: EstiloAprendizaje;
}

export interface InteresesData {
  principales: Interes[];
  desglose: Record<Interes, number>;
}

export interface NivelAcademicoData {
  matematicas: {
    nivel: NivelAcademico;
    correctas: number;
    total: number;
    detalle: {
      sumas_reagrupamiento: boolean;
      fracciones: boolean;
    };
  };
  español: {
    nivel: NivelAcademico;
    correctas: number;
    total: number;
    detalle: {
      adverbios: boolean;
      ortografia: boolean;
    };
  };
}

export interface RespuestaRaw {
  pregunta_id: string;
  pregunta: string;
  respuesta: string | string[];
  timestamp: string;
  seccion: 'demografica' | 'estilo' | 'intereses' | 'academico';
}

export interface CuestionarioCompleto {
  user_id: string;
  fecha_cuestionario: string;
  tiempo_completado_segundos: number;
  perfil_demografico: PerfilDemografico;
  estilo_aprendizaje: EstiloAprendizajeScore;
  intereses: InteresesData;
  nivel_academico: NivelAcademicoData;
  respuestas_raw: RespuestaRaw[];
  metricas_engagement: {
    preguntas_respondidas: number;
    preguntas_cambiadas: number;
    tiempo_promedio_por_pregunta: number;
    abandono_temporal: boolean;
    completado: boolean;
  };
}

export interface Pregunta {
  id: string;
  texto: string;
  tipo: 'texto' | 'numero' | 'opcion_unica' | 'opcion_multiple' | 'dropdown';
  opciones?: OpcionPregunta[];
  placeholder?: string;
  icono?: string;
  tooltip?: string;
  requerido: boolean;
  validacion?: (valor: any) => boolean;
  mensajeError?: string;
}

export interface OpcionPregunta {
  valor: string;
  etiqueta: string;
  icono?: string;
  puntuacion?: {
    visual?: number;
    verbal?: number;
    kinestesico?: number;
  };
  interes?: Interes;
  esCorrecta?: boolean;
}

export interface SeccionCuestionario {
  id: string;
  titulo: string;
  descripcion: string;
  preguntas: Pregunta[];
  tiempoEstimado: number; // en segundos
}
