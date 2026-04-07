// ============================================
// PREGUNTAS DEL CUESTIONARIO COGNITIVA
// ============================================

import { SeccionCuestionario, Pregunta } from './types';

// =====================
// SECCIÓN 1: DEMOGRÁFICA
// =====================

export const seccionDemografica: SeccionCuestionario = {
  id: 'demografica',
  titulo: '¡Cuéntanos de ti!',
  descripcion: 'Queremos conocerte mejor para personalizar tu experiencia',
  tiempoEstimado: 90,
  preguntas: [
    {
      id: 'P1',
      texto: '¿Cómo te llamas?',
      tipo: 'texto',
      placeholder: 'Escribe tu nombre aquí',
      icono: '👤',
      tooltip: 'Usaremos tu nombre para personalizar tus ejercicios',
      requerido: true,
      validacion: (valor: string) => valor.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor),
      mensajeError: 'Por favor escribe tu nombre (mínimo 2 letras)'
    },
    {
      id: 'P2',
      texto: '¿Cuántos años tienes?',
      tipo: 'opcion_unica',
      icono: '🎂',
      requerido: true,
      opciones: [
        { valor: '8', etiqueta: '8 años' },
        { valor: '9', etiqueta: '9 años' },
        { valor: '10', etiqueta: '10 años' },
        { valor: '11', etiqueta: '11 años' },
        { valor: 'otro', etiqueta: 'Otra edad' }
      ]
    },
    {
      id: 'P3',
      texto: '¿En qué grado estás?',
      tipo: 'opcion_unica',
      icono: '📚',
      requerido: true,
      opciones: [
        { valor: '3_primaria', etiqueta: '3° de Primaria' },
        { valor: '4_primaria', etiqueta: '4° de Primaria' },
        { valor: '5_primaria', etiqueta: '5° de Primaria' },
        { valor: 'otro', etiqueta: 'Otro grado' }
      ]
    },
    {
      id: 'P4',
      texto: '¿Cómo te identificas?',
      tipo: 'opcion_unica',
      icono: '😊',
      tooltip: 'Esto nos ayuda a elegir ejemplos en los ejercicios',
      requerido: false,
      opciones: [
        { valor: 'niño', etiqueta: 'Niño', icono: '👦' },
        { valor: 'niña', etiqueta: 'Niña', icono: '👧' },
        { valor: 'prefiero_no_decir', etiqueta: 'Prefiero no decirlo', icono: '😊' }
      ]
    },
    {
      id: 'P5',
      texto: '¿Cuál es el nombre de tu escuela?',
      tipo: 'texto',
      placeholder: 'Ej: Escuela Primaria Benito Juárez',
      icono: '🏫',
      tooltip: 'Esto ayuda a personalizar contenido según tu plan de estudios',
      requerido: false,
      validacion: (valor: string) => !valor || valor.length >= 3,
      mensajeError: 'El nombre debe tener al menos 3 caracteres'
    },
    {
      id: 'P6',
      texto: '¿Dónde vives? (Código Postal)',
      tipo: 'numero',
      placeholder: '06140',
      icono: '📍',
      tooltip: 'Ejemplo: Si vives en la Condesa, CDMX → 06140',
      requerido: true,
      validacion: (valor: string) => /^\d{5}$/.test(valor) && parseInt(valor) >= 1000 && parseInt(valor) <= 99999,
      mensajeError: 'Ingresa un código postal válido de 5 dígitos'
    },
    {
      id: 'P7',
      texto: '¿Quién te ayudará a usar Cognitiva?',
      tipo: 'opcion_unica',
      icono: '👥',
      tooltip: 'Esta información nos ayuda a saber cómo comunicarnos contigo',
      requerido: true,
      opciones: [
        { valor: 'familia', etiqueta: 'Mi familia', icono: '👨‍👩‍👧' },
        { valor: 'maestro', etiqueta: 'Mi maestro/a', icono: '👩‍🏫' },
        { valor: 'solo', etiqueta: 'Yo solo/a', icono: '😊' },
        { valor: 'otro', etiqueta: 'Alguien más', icono: '👥' }
      ]
    }
  ]
};

// =====================
// SECCIÓN 2: ESTILO DE APRENDIZAJE
// =====================

export const seccionEstiloAprendizaje: SeccionCuestionario = {
  id: 'estilo',
  titulo: '¿Cómo te gusta aprender?',
  descripcion: 'Descubre tu estilo de aprendizaje',
  tiempoEstimado: 150,
  preguntas: [
    {
      id: 'P8',
      texto: 'Cuando quieres aprender a armar algo nuevo, ¿qué haces primero?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { 
          valor: 'a', 
          etiqueta: 'Veo las imágenes del instructivo', 
          icono: '📸',
          puntuacion: { visual: 1, verbal: 0, kinestesico: 0 }
        },
        { 
          valor: 'b', 
          etiqueta: 'Leo las instrucciones paso a paso', 
          icono: '📖',
          puntuacion: { visual: 0, verbal: 1, kinestesico: 0 }
        },
        { 
          valor: 'c', 
          etiqueta: 'Empiezo a armarlo probando por mi cuenta', 
          icono: '🔧',
          puntuacion: { visual: 0, verbal: 0, kinestesico: 1 }
        }
      ]
    },
    {
      id: 'P9',
      texto: 'En clase de Geografía, ¿qué te ayuda más a recordar los estados de México?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { 
          valor: 'a', 
          etiqueta: 'Ver mapas con colores diferentes', 
          icono: '🗺️',
          puntuacion: { visual: 1, verbal: 0, kinestesico: 0 }
        },
        { 
          valor: 'b', 
          etiqueta: 'Hacer una canción o rima con los nombres', 
          icono: '🎵',
          puntuacion: { visual: 0, verbal: 1, kinestesico: 0 }
        },
        { 
          valor: 'c', 
          etiqueta: 'Armar un rompecabezas del mapa', 
          icono: '🧩',
          puntuacion: { visual: 0, verbal: 0, kinestesico: 1 }
        }
      ]
    },
    {
      id: 'P10',
      texto: 'Si tienes que hacer una tarea sobre las plantas, ¿qué te gusta más?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { 
          valor: 'a', 
          etiqueta: 'Hacer un póster con dibujos y fotos', 
          icono: '🎨',
          puntuacion: { visual: 1, verbal: 0, kinestesico: 0 }
        },
        { 
          valor: 'b', 
          etiqueta: 'Escribir un reporte sobre cómo crecen', 
          icono: '📝',
          puntuacion: { visual: 0, verbal: 1, kinestesico: 0 }
        },
        { 
          valor: 'c', 
          etiqueta: 'Sembrar una semilla y observarla crecer', 
          icono: '🌱',
          puntuacion: { visual: 0, verbal: 0, kinestesico: 1 }
        }
      ]
    },
    {
      id: 'P11',
      texto: 'Cuando tu maestro enseña multiplicación, entiendes mejor si:',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { 
          valor: 'a', 
          etiqueta: 'Dibuja grupos de objetos en el pizarrón', 
          icono: '⭕',
          puntuacion: { visual: 1, verbal: 0, kinestesico: 0 }
        },
        { 
          valor: 'b', 
          etiqueta: 'Explica con palabras cómo funciona', 
          icono: '💬',
          puntuacion: { visual: 0, verbal: 1, kinestesico: 0 }
        },
        { 
          valor: 'c', 
          etiqueta: 'Usas fichas o tus dedos para contar', 
          icono: '🖐️',
          puntuacion: { visual: 0, verbal: 0, kinestesico: 1 }
        }
      ]
    },
    {
      id: 'P12',
      texto: '¿Cómo prefieres estudiar para un examen?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { 
          valor: 'a', 
          etiqueta: 'Haciendo dibujos, cuadros o esquemas', 
          icono: '📊',
          puntuacion: { visual: 1, verbal: 0, kinestesico: 0 }
        },
        { 
          valor: 'b', 
          etiqueta: 'Releyendo mis apuntes varias veces', 
          icono: '📚',
          puntuacion: { visual: 0, verbal: 1, kinestesico: 0 }
        },
        { 
          valor: 'c', 
          etiqueta: 'Practicando ejercicios una y otra vez', 
          icono: '✏️',
          puntuacion: { visual: 0, verbal: 0, kinestesico: 1 }
        }
      ]
    },
    {
      id: 'P13',
      texto: 'En la clase de Historia, ¿qué actividad disfrutas más?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { 
          valor: 'a', 
          etiqueta: 'Ver videos o documentales', 
          icono: '📺',
          puntuacion: { visual: 1, verbal: 0, kinestesico: 0 }
        },
        { 
          valor: 'b', 
          etiqueta: 'Leer historias sobre personajes antiguos', 
          icono: '📖',
          puntuacion: { visual: 0, verbal: 1, kinestesico: 0 }
        },
        { 
          valor: 'c', 
          etiqueta: 'Hacer una obra de teatro sobre la época', 
          icono: '🎭',
          puntuacion: { visual: 0, verbal: 0, kinestesico: 1 }
        }
      ]
    }
  ]
};

// =====================
// SECCIÓN 3: INTERESES
// =====================

export const seccionIntereses: SeccionCuestionario = {
  id: 'intereses',
  titulo: '¿Qué te gusta hacer?',
  descripcion: 'Cuéntanos sobre tus intereses favoritos',
  tiempoEstimado: 120,
  preguntas: [
    {
      id: 'P14',
      texto: '¿Qué harías el sábado perfecto? (Selecciona hasta 3 opciones)',
      tipo: 'opcion_multiple',
      requerido: true,
      opciones: [
        { valor: 'deportes', etiqueta: 'Jugar fútbol con mis amigos', icono: '⚽', interes: 'deportes' },
        { valor: 'arte', etiqueta: 'Dibujar o pintar en mi cuaderno', icono: '🖍️', interes: 'arte' },
        { valor: 'lectura', etiqueta: 'Leer cuentos o cómics', icono: '📚', interes: 'lectura' },
        { valor: 'tecnologia', etiqueta: 'Jugar videojuegos', icono: '🎮', interes: 'tecnologia' },
        { valor: 'ciencia', etiqueta: 'Ver videos de experimentos', icono: '🔬', interes: 'ciencia' },
        { valor: 'musica', etiqueta: 'Tocar mi instrumento favorito', icono: '🎸', interes: 'musica' },
        { valor: 'animales', etiqueta: 'Jugar con mi mascota', icono: '🐕', interes: 'animales' },
        { valor: 'construccion', etiqueta: 'Armar cosas con LEGO o bloques', icono: '🧱', interes: 'construccion' },
        { valor: 'cocina', etiqueta: 'Ayudar a cocinar en casa', icono: '🍳', interes: 'cocina' },
        { valor: 'matematicas', etiqueta: 'Resolver rompecabezas difíciles', icono: '🧠', interes: 'matematicas' }
      ]
    },
    {
      id: 'P15',
      texto: 'Si pudieras tener un superpoder, ¿cuál escogerías?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: 'animales', etiqueta: 'Hablar con los animales', icono: '🦜', interes: 'animales' },
        { valor: 'ciencia', etiqueta: 'Crear inventos increíbles', icono: '🤖', interes: 'ciencia' },
        { valor: 'lectura', etiqueta: 'Viajar en el tiempo al pasado', icono: '🏛️', interes: 'lectura' },
        { valor: 'deportes', etiqueta: 'Hacer que las cosas se muevan con la mente', icono: '🎯', interes: 'deportes' }
      ]
    },
    {
      id: 'P16',
      texto: '¿Qué programa de TV o YouTube te gusta más?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: 'arte', etiqueta: 'Tutoriales de manualidades o dibujo', icono: '🎨', interes: 'arte' },
        { valor: 'tecnologia', etiqueta: 'Gameplays o reseñas de juegos', icono: '🎮', interes: 'tecnologia' },
        { valor: 'animales', etiqueta: 'Documentales de animales o naturaleza', icono: '🌍', interes: 'animales' },
        { valor: 'ciencia', etiqueta: 'Videos de trucos de magia o ciencia', icono: '🪄', interes: 'ciencia' }
      ]
    },
    {
      id: 'P17',
      texto: 'En tu cumpleaños, ¿qué regalo te emocionaría más?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: 'deportes', etiqueta: 'Un balón nuevo o equipo deportivo', icono: '⚽', interes: 'deportes' },
        { valor: 'arte', etiqueta: 'Un set de arte o manualidades', icono: '🎨', interes: 'arte' },
        { valor: 'lectura', etiqueta: 'Un libro de aventuras o misterio', icono: '📖', interes: 'lectura' },
        { valor: 'tecnologia', etiqueta: 'Un videojuego o gadget tecnológico', icono: '🎮', interes: 'tecnologia' }
      ]
    },
    {
      id: 'P18',
      texto: 'Si tu escuela organizara clubes, ¿a cuál te inscribirías?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: 'ciencia', etiqueta: 'Club de robótica o ciencias', icono: '🤖', interes: 'ciencia' },
        { valor: 'musica', etiqueta: 'Club de música o coro', icono: '🎵', interes: 'musica' },
        { valor: 'cocina', etiqueta: 'Club de cocina y repostería', icono: '🧁', interes: 'cocina' },
        { valor: 'deportes', etiqueta: 'Club de deportes y atletismo', icono: '🏃', interes: 'deportes' }
      ]
    }
  ]
};

// =====================
// SECCIÓN 4: NIVEL ACADÉMICO
// =====================

export const seccionNivelAcademico: SeccionCuestionario = {
  id: 'academico',
  titulo: 'Preguntas rápidas',
  descripcion: 'Algunas preguntas para conocer tu nivel',
  tiempoEstimado: 90,
  preguntas: [
    {
      id: 'P19',
      texto: '¿Cuánto es 245 + 178?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: '413', etiqueta: '413', esCorrecta: false },
        { valor: '423', etiqueta: '423', esCorrecta: true },
        { valor: '323', etiqueta: '323', esCorrecta: false },
        { valor: 'no_se', etiqueta: 'No estoy seguro', esCorrecta: false }
      ]
    },
    {
      id: 'P20',
      texto: '¿Cuánto es 3/4 + 1/4?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: '4/8', etiqueta: '4/8', esCorrecta: false },
        { valor: '4/4', etiqueta: '4/4', esCorrecta: true },
        { valor: '1', etiqueta: '1', esCorrecta: true },
        { valor: '3', etiqueta: '3', esCorrecta: false }
      ]
    },
    {
      id: 'P21',
      texto: 'Lee la oración: "El pequeño ratón corrió velozmente". ¿Qué palabra describe CÓMO corrió el ratón?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: 'pequeño', etiqueta: 'pequeño', esCorrecta: false },
        { valor: 'ratón', etiqueta: 'ratón', esCorrecta: false },
        { valor: 'corrió', etiqueta: 'corrió', esCorrecta: false },
        { valor: 'velozmente', etiqueta: 'velozmente', esCorrecta: true }
      ]
    },
    {
      id: 'P22',
      texto: '¿Cuál palabra está escrita CORRECTAMENTE?',
      tipo: 'opcion_unica',
      requerido: true,
      opciones: [
        { valor: 'tranqilo', etiqueta: 'Tranqilo', esCorrecta: false },
        { valor: 'tranquilo', etiqueta: 'Tranquilo', esCorrecta: true },
        { valor: 'trankilo', etiqueta: 'Trankilo', esCorrecta: false },
        { valor: 'tranquillo', etiqueta: 'Tranquillo', esCorrecta: false }
      ]
    }
  ]
};

// =====================
// TODAS LAS SECCIONES
// =====================

export const todasLasSecciones: SeccionCuestionario[] = [
  seccionDemografica,
  seccionEstiloAprendizaje,
  seccionIntereses,
  seccionNivelAcademico
];

export const totalPreguntas = todasLasSecciones.reduce(
  (total, seccion) => total + seccion.preguntas.length, 
  0
);
