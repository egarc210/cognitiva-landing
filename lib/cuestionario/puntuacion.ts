// ============================================
// SISTEMA DE PUNTUACIÓN Y ANÁLISIS
// ============================================

import { 
  EstiloAprendizaje, 
  EstiloAprendizajeScore, 
  NivelAcademico,
  NivelAcademicoData,
  InteresesData,
  Interes,
  RespuestaRaw 
} from './types';

/**
 * Calcula el estilo de aprendizaje dominante
 */
export function calcularEstiloAprendizaje(respuestas: RespuestaRaw[]): EstiloAprendizajeScore {
  const scores = {
    visual: 0,
    verbal: 0,
    kinestesico: 0
  };

  // Filtrar respuestas de la sección de estilo (P8-P13)
  const respuestasEstilo = respuestas.filter(r => 
    r.seccion === 'estilo' && 
    ['P8', 'P9', 'P10', 'P11', 'P12', 'P13'].includes(r.pregunta_id)
  );

  respuestasEstilo.forEach(respuesta => {
    const valor = respuesta.respuesta as string;
    
    // Mapeo de respuestas a puntuaciones
    switch (valor) {
      case 'a':
        scores.visual += 1;
        break;
      case 'b':
        scores.verbal += 1;
        break;
      case 'c':
        scores.kinestesico += 1;
        break;
    }
  });

  // Determinar dominante
  let dominante: EstiloAprendizaje = 'visual';
  let maxScore = scores.visual;

  if (scores.verbal > maxScore) {
    dominante = 'verbal';
    maxScore = scores.verbal;
  }
  if (scores.kinestesico > maxScore) {
    dominante = 'kinestesico';
    maxScore = scores.kinestesico;
  }

  // Verificar si hay empate (multimodal)
  const esEmpate = Object.values(scores).filter(s => s === maxScore).length > 1;
  if (esEmpate) {
    dominante = 'multimodal';
  }

  // Determinar secundario
  let secundario: EstiloAprendizaje | undefined;
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sortedScores[1][1] > 0 && !esEmpate) {
    secundario = sortedScores[1][0] as EstiloAprendizaje;
  }

  return {
    visual_score: scores.visual,
    verbal_score: scores.verbal,
    kinestesico_score: scores.kinestesico,
    dominante,
    secundario
  };
}

/**
 * Calcula los intereses principales del estudiante
 */
export function calcularIntereses(respuestas: RespuestaRaw[]): InteresesData {
  const conteoIntereses: Record<Interes, number> = {
    deportes: 0,
    arte: 0,
    lectura: 0,
    tecnologia: 0,
    ciencia: 0,
    musica: 0,
    animales: 0,
    construccion: 0,
    cocina: 0,
    matematicas: 0
  };

  // Filtrar respuestas de intereses (P14-P18)
  const respuestasIntereses = respuestas.filter(r => 
    r.seccion === 'intereses' && 
    ['P14', 'P15', 'P16', 'P17', 'P18'].includes(r.pregunta_id)
  );

  respuestasIntereses.forEach(respuesta => {
    if (respuesta.pregunta_id === 'P14') {
      // P14 es selección múltiple, cuenta doble
      const seleccionados = respuesta.respuesta as string[];
      seleccionados.forEach(interes => {
        if (interes in conteoIntereses) {
          conteoIntereses[interes as Interes] += 2;
        }
      });
    } else {
      // Resto son selección única
      const interes = respuesta.respuesta as string;
      if (interes in conteoIntereses) {
        conteoIntereses[interes as Interes] += 1;
      }
    }
  });

  // Obtener top 3
  const principales = Object.entries(conteoIntereses)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, count]) => count > 0)
    .slice(0, 3)
    .map(([interes, _]) => interes as Interes);

  return {
    principales,
    desglose: conteoIntereses
  };
}

/**
 * Calcula el nivel académico en Matemáticas y Español
 */
export function calcularNivelAcademico(respuestas: RespuestaRaw[]): NivelAcademicoData {
  // Matemáticas: P19 y P20
  const respuestasMatematicas = respuestas.filter(r => 
    r.seccion === 'academico' && ['P19', 'P20'].includes(r.pregunta_id)
  );

  const matematicasCorrectas = respuestasMatematicas.filter(r => {
    if (r.pregunta_id === 'P19') {
      return r.respuesta === '423';
    }
    if (r.pregunta_id === 'P20') {
      return r.respuesta === '4/4' || r.respuesta === '1';
    }
    return false;
  }).length;

  const nivelMatematicas = determinarNivel(matematicasCorrectas, 2);

  // Español: P21 y P22
  const respuestasEspanol = respuestas.filter(r => 
    r.seccion === 'academico' && ['P21', 'P22'].includes(r.pregunta_id)
  );

  const espanolCorrectas = respuestasEspanol.filter(r => {
    if (r.pregunta_id === 'P21') {
      return r.respuesta === 'velozmente';
    }
    if (r.pregunta_id === 'P22') {
      return r.respuesta === 'tranquilo';
    }
    return false;
  }).length;

  const nivelEspanol = determinarNivel(espanolCorrectas, 2);

  return {
    matematicas: {
      nivel: nivelMatematicas,
      correctas: matematicasCorrectas,
      total: 2,
      detalle: {
        sumas_reagrupamiento: respuestasMatematicas.find(r => r.pregunta_id === 'P19')?.respuesta === '423' || false,
        fracciones: respuestasMatematicas.find(r => r.pregunta_id === 'P20')?.respuesta === '4/4' || 
                    respuestasMatematicas.find(r => r.pregunta_id === 'P20')?.respuesta === '1' || false
      }
    },
    español: {
      nivel: nivelEspanol,
      correctas: espanolCorrectas,
      total: 2,
      detalle: {
        adverbios: respuestasEspanol.find(r => r.pregunta_id === 'P21')?.respuesta === 'velozmente' || false,
        ortografia: respuestasEspanol.find(r => r.pregunta_id === 'P22')?.respuesta === 'tranquilo' || false
      }
    }
  };
}

/**
 * Determina el nivel académico según correctas/total
 */
function determinarNivel(correctas: number, total: number): NivelAcademico {
  const porcentaje = (correctas / total) * 100;

  if (porcentaje >= 80) {
    return 'avanzado';
  } else if (porcentaje >= 50) {
    return 'nivel';
  } else {
    return 'refuerzo';
  }
}

/**
 * Genera recomendaciones personalizadas basadas en el perfil
 */
export function generarRecomendaciones(
  estiloAprendizaje: EstiloAprendizajeScore,
  intereses: InteresesData,
  nivelAcademico: NivelAcademicoData
): string[] {
  const recomendaciones: string[] = [];

  // Recomendaciones por estilo de aprendizaje
  switch (estiloAprendizaje.dominante) {
    case 'visual':
      recomendaciones.push('Usa diagramas, mapas mentales y colores para estudiar');
      recomendaciones.push('Mira videos educativos sobre los temas que estudias');
      break;
    case 'verbal':
      recomendaciones.push('Lee en voz alta y explica los conceptos con tus propias palabras');
      recomendaciones.push('Crea resúmenes escritos de lo que aprendes');
      break;
    case 'kinestesico':
      recomendaciones.push('Practica con ejercicios y actividades manuales');
      recomendaciones.push('Haz experimentos y proyectos prácticos');
      break;
    case 'multimodal':
      recomendaciones.push('Combina diferentes métodos: lee, ve videos y practica');
      break;
  }

  // Recomendaciones por intereses
  if (intereses.principales.includes('ciencia')) {
    recomendaciones.push('Tus ejercicios incluirán experimentos y temas científicos');
  }
  if (intereses.principales.includes('deportes')) {
    recomendaciones.push('Usaremos ejemplos de deportes en tus ejercicios matemáticos');
  }
  if (intereses.principales.includes('arte')) {
    recomendaciones.push('Incluiremos actividades creativas y proyectos artísticos');
  }

  // Recomendaciones por nivel académico
  if (nivelAcademico.matematicas.nivel === 'refuerzo') {
    recomendaciones.push('Empezaremos con ejercicios básicos de matemáticas para fortalecer tu base');
  }
  if (nivelAcademico.español.nivel === 'refuerzo') {
    recomendaciones.push('Practicaremos ortografía y gramática de forma divertida');
  }
  if (nivelAcademico.matematicas.nivel === 'avanzado') {
    recomendaciones.push('Te daremos retos matemáticos más avanzados');
  }

  return recomendaciones;
}

/**
 * Calcula métricas de engagement
 */
export function calcularMetricasEngagement(
  respuestas: RespuestaRaw[],
  tiempoTotal: number,
  cambiosRespuesta: number
): {
  preguntas_respondidas: number;
  preguntas_cambiadas: number;
  tiempo_promedio_por_pregunta: number;
  abandono_temporal: boolean;
  completado: boolean;
} {
  const totalEsperado = 22;
  const respondidas = respuestas.length;
  
  return {
    preguntas_respondidas: respondidas,
    preguntas_cambiadas: cambiosRespuesta,
    tiempo_promedio_por_pregunta: Math.round(tiempoTotal / respondidas),
    abandono_temporal: false, // Se detectaría con lógica de sesión
    completado: respondidas === totalEsperado
  };
}
