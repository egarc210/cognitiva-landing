// ============================================
// HOOK PERSONALIZADO: useCuestionario
// ============================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  RespuestaRaw, 
  CuestionarioCompleto,
  PerfilDemografico 
} from '@/lib/cuestionario/types';
import { todasLasSecciones } from '@/lib/cuestionario/preguntas';
import { 
  calcularEstiloAprendizaje, 
  calcularIntereses, 
  calcularNivelAcademico,
  calcularMetricasEngagement,
  generarRecomendaciones 
} from '@/lib/cuestionario/puntuacion';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'cognitiva_cuestionario_progreso';

interface UseCuestionarioReturn {
  // Estado
  seccionActual: number;
  preguntaActual: number;
  respuestas: Record<string, any>;
  respuestasRaw: RespuestaRaw[];
  tiempoInicio: number;
  cambiosRespuesta: number;
  
  // Progreso
  totalPreguntas: number;
  preguntasRespondidas: number;
  porcentajeCompletado: number;
  
  // Acciones
  responder: (preguntaId: string, valor: any) => void;
  siguientePregunta: () => void;
  preguntaAnterior: () => void;
  irASeccion: (seccion: number) => void;
  guardarProgreso: () => void;
  cargarProgreso: () => void;
  finalizarCuestionario: () => CuestionarioCompleto;
  reiniciar: () => void;
  
  // Validación
  puedeAvanzar: boolean;
  preguntaActualObj: any;
  seccionActualObj: any;
}

export function useCuestionario(): UseCuestionarioReturn {
  const [seccionActual, setSeccionActual] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, any>>({});
  const [respuestasRaw, setRespuestasRaw] = useState<RespuestaRaw[]>([]);
  const [tiempoInicio] = useState(Date.now());
  const [cambiosRespuesta, setCambiosRespuesta] = useState(0);

  // Calcular totales
  const totalPreguntas = todasLasSecciones.reduce(
    (total, seccion) => total + seccion.preguntas.length,
    0
  );

  const preguntasRespondidas = Object.keys(respuestas).length;
  const porcentajeCompletado = Math.round((preguntasRespondidas / totalPreguntas) * 100);

  // Obtener objetos actuales
  const seccionActualObj = todasLasSecciones[seccionActual];
  const preguntaActualObj = seccionActualObj?.preguntas[preguntaActual];

  // Verificar si puede avanzar
  const puedeAvanzar = preguntaActualObj 
    ? respuestas[preguntaActualObj.id] !== undefined 
    : false;

  /**
   * Guardar respuesta
   */
  const responder = useCallback((preguntaId: string, valor: any) => {
    setRespuestas(prev => {
      // Detectar si es un cambio de respuesta
      if (prev[preguntaId] !== undefined && prev[preguntaId] !== valor) {
        setCambiosRespuesta(c => c + 1);
      }

      return { ...prev, [preguntaId]: valor };
    });

    // Guardar en respuestas raw
    setRespuestasRaw(prev => {
      const index = prev.findIndex(r => r.pregunta_id === preguntaId);
      const nuevaRespuesta: RespuestaRaw = {
        pregunta_id: preguntaId,
        pregunta: preguntaActualObj?.texto || '',
        respuesta: valor,
        timestamp: new Date().toISOString(),
        seccion: seccionActualObj.id as any
      };

      if (index !== -1) {
        // Actualizar existente
        const updated = [...prev];
        updated[index] = nuevaRespuesta;
        return updated;
      } else {
        // Agregar nueva
        return [...prev, nuevaRespuesta];
      }
    });
  }, [preguntaActualObj, seccionActualObj]);

  /**
   * Siguiente pregunta
   */
  const siguientePregunta = useCallback(() => {
    const seccion = todasLasSecciones[seccionActual];
    
    if (preguntaActual < seccion.preguntas.length - 1) {
      // Siguiente pregunta en la misma sección
      setPreguntaActual(prev => prev + 1);
    } else if (seccionActual < todasLasSecciones.length - 1) {
      // Siguiente sección
      setSeccionActual(prev => prev + 1);
      setPreguntaActual(0);
    }

    guardarProgreso();
  }, [seccionActual, preguntaActual]);

  /**
   * Pregunta anterior
   */
  const preguntaAnterior = useCallback(() => {
    if (preguntaActual > 0) {
      // Pregunta anterior en la misma sección
      setPreguntaActual(prev => prev - 1);
    } else if (seccionActual > 0) {
      // Sección anterior
      const seccionAnterior = todasLasSecciones[seccionActual - 1];
      setSeccionActual(prev => prev - 1);
      setPreguntaActual(seccionAnterior.preguntas.length - 1);
    }
  }, [seccionActual, preguntaActual]);

  /**
   * Ir a sección específica
   */
  const irASeccion = useCallback((seccion: number) => {
    if (seccion >= 0 && seccion < todasLasSecciones.length) {
      setSeccionActual(seccion);
      setPreguntaActual(0);
    }
  }, []);

  /**
   * Guardar progreso en localStorage
   */
  const guardarProgreso = useCallback(() => {
    if (typeof window !== 'undefined') {
      const progreso = {
        seccionActual,
        preguntaActual,
        respuestas,
        respuestasRaw,
        tiempoInicio,
        cambiosRespuesta,
        ultimaActualizacion: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
    }
  }, [seccionActual, preguntaActual, respuestas, respuestasRaw, tiempoInicio, cambiosRespuesta]);

  /**
   * Cargar progreso desde localStorage
   */
  const cargarProgreso = useCallback(() => {
    if (typeof window !== 'undefined') {
      const progresoGuardado = localStorage.getItem(STORAGE_KEY);
      if (progresoGuardado) {
        try {
          const progreso = JSON.parse(progresoGuardado);
          setSeccionActual(progreso.seccionActual);
          setPreguntaActual(progreso.preguntaActual);
          setRespuestas(progreso.respuestas);
          setRespuestasRaw(progreso.respuestasRaw);
          setCambiosRespuesta(progreso.cambiosRespuesta);
        } catch (error) {
          console.error('Error cargando progreso:', error);
        }
      }
    }
  }, []);

  /**
   * Finalizar cuestionario y generar resultado completo
   */
  const finalizarCuestionario = useCallback((): CuestionarioCompleto => {
    const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);

    // Extraer perfil demográfico
    const perfilDemografico: PerfilDemografico = {
      nombre: respuestas['P1'] || '',
      edad: parseInt(respuestas['P2']) || 10,
      grado: respuestas['P3'] || '4_primaria',
      genero: respuestas['P4'],
      escuela: {
        nombre: respuestas['P5'],
        homeschool: !respuestas['P5']
      },
      ubicacion: {
        codigoPostal: respuestas['P6']
      },
      supervision: respuestas['P7'] || 'familia'
    };

    // Calcular análisis
    const estiloAprendizaje = calcularEstiloAprendizaje(respuestasRaw);
    const intereses = calcularIntereses(respuestasRaw);
    const nivelAcademico = calcularNivelAcademico(respuestasRaw);
    const metricas = calcularMetricasEngagement(respuestasRaw, tiempoTotal, cambiosRespuesta);

    const resultado: CuestionarioCompleto = {
      user_id: uuidv4(),
      fecha_cuestionario: new Date().toISOString(),
      tiempo_completado_segundos: tiempoTotal,
      perfil_demografico: perfilDemografico,
      estilo_aprendizaje: estiloAprendizaje,
      intereses,
      nivel_academico: nivelAcademico,
      respuestas_raw: respuestasRaw,
      metricas_engagement: metricas
    };

    // Guardar resultado en localStorage (temporal)
    if (typeof window !== 'undefined') {
      localStorage.setItem('cognitiva_resultado', JSON.stringify(resultado));
      localStorage.removeItem(STORAGE_KEY); // Limpiar progreso
    }

    return resultado;
  }, [respuestas, respuestasRaw, tiempoInicio, cambiosRespuesta]);

  /**
   * Reiniciar cuestionario
   */
  const reiniciar = useCallback(() => {
    setSeccionActual(0);
    setPreguntaActual(0);
    setRespuestas({});
    setRespuestasRaw([]);
    setCambiosRespuesta(0);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Cargar progreso al montar
  useEffect(() => {
    cargarProgreso();
  }, [cargarProgreso]);

  // Auto-guardar cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      guardarProgreso();
    }, 10000);

    return () => clearInterval(interval);
  }, [guardarProgreso]);

  return {
    // Estado
    seccionActual,
    preguntaActual,
    respuestas,
    respuestasRaw,
    tiempoInicio,
    cambiosRespuesta,
    
    // Progreso
    totalPreguntas,
    preguntasRespondidas,
    porcentajeCompletado,
    
    // Acciones
    responder,
    siguientePregunta,
    preguntaAnterior,
    irASeccion,
    guardarProgreso,
    cargarProgreso,
    finalizarCuestionario,
    reiniciar,
    
    // Validación
    puedeAvanzar,
    preguntaActualObj,
    seccionActualObj
  };
}
