// ============================================
// UTILIDADES DE VALIDACIÓN
// ============================================

export interface ValidacionResultado {
  valido: boolean;
  mensaje?: string;
  advertencia?: boolean;
}

/**
 * Valida coherencia entre edad y grado escolar
 */
export function validarCoherenciaEdadGrado(
  edad: number, 
  grado: string
): ValidacionResultado {
  const coherencia: Record<string, number[]> = {
    '3_primaria': [8, 9],
    '4_primaria': [9, 10],
    '5_primaria': [10, 11]
  };

  if (!coherencia[grado]) {
    return { valido: true };
  }

  if (!coherencia[grado].includes(edad)) {
    return {
      valido: true,
      advertencia: true,
      mensaje: `Muchos estudiantes de ${obtenerNombreGrado(grado)} tienen ${coherencia[grado].join(' o ')} años. ¿Estás seguro de tu respuesta?`
    };
  }

  return { valido: true };
}

/**
 * Valida formato de código postal mexicano
 */
export function validarCodigoPostal(cp: string): ValidacionResultado {
  // Eliminar espacios
  const cpLimpio = cp.trim();

  // Verificar que tenga 5 dígitos
  if (!/^\d{5}$/.test(cpLimpio)) {
    return {
      valido: false,
      mensaje: 'El código postal debe tener 5 dígitos'
    };
  }

  const cpNumero = parseInt(cpLimpio);

  // Verificar rango válido en México
  if (cpNumero < 1000 || cpNumero > 99999) {
    return {
      valido: false,
      mensaje: 'Ingresa un código postal válido de México'
    };
  }

  return { valido: true };
}

/**
 * Valida nombre (solo letras, espacios y acentos)
 */
export function validarNombre(nombre: string): ValidacionResultado {
  const nombreLimpio = nombre.trim();

  if (nombreLimpio.length < 2) {
    return {
      valido: false,
      mensaje: 'El nombre debe tener al menos 2 letras'
    };
  }

  if (nombreLimpio.length > 50) {
    return {
      valido: false,
      mensaje: 'El nombre es demasiado largo'
    };
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreLimpio)) {
    return {
      valido: false,
      mensaje: 'El nombre solo puede contener letras'
    };
  }

  return { valido: true };
}

/**
 * Valida nombre de escuela
 */
export function validarNombreEscuela(nombre: string): ValidacionResultado {
  if (!nombre || nombre.trim().length === 0) {
    return { valido: true }; // Opcional
  }

  const nombreLimpio = nombre.trim();

  if (nombreLimpio.length < 3) {
    return {
      valido: false,
      mensaje: 'El nombre de la escuela debe tener al menos 3 caracteres'
    };
  }

  if (nombreLimpio.length > 100) {
    return {
      valido: false,
      mensaje: 'El nombre es demasiado largo'
    };
  }

  return { valido: true };
}

/**
 * Valida selección múltiple (máximo 3 opciones)
 */
export function validarSeleccionMultiple(
  seleccionados: string[], 
  maximo: number = 3
): ValidacionResultado {
  if (seleccionados.length === 0) {
    return {
      valido: false,
      mensaje: 'Selecciona al menos una opción'
    };
  }

  if (seleccionados.length > maximo) {
    return {
      valido: false,
      mensaje: `Puedes seleccionar máximo ${maximo} opciones`
    };
  }

  return { valido: true };
}

/**
 * Obtiene nombre legible del grado
 */
export function obtenerNombreGrado(grado: string): string {
  const nombres: Record<string, string> = {
    '3_primaria': '3° de Primaria',
    '4_primaria': '4° de Primaria',
    '5_primaria': '5° de Primaria'
  };

  return nombres[grado] || grado;
}

/**
 * Detecta información del código postal (mock - en producción usar API SEPOMEX)
 */
export function detectarUbicacion(cp: string): {
  ciudad?: string;
  estado?: string;
  zona?: 'urbana' | 'suburbana' | 'rural';
} {
  const cpNum = parseInt(cp);

  // Mock de detección básica por rangos (esto debe conectarse a SEPOMEX API)
  if (cpNum >= 1000 && cpNum <= 16999) {
    return { ciudad: 'Ciudad de México', estado: 'CDMX', zona: 'urbana' };
  } else if (cpNum >= 64000 && cpNum <= 67999) {
    return { ciudad: 'Monterrey', estado: 'Nuevo León', zona: 'urbana' };
  } else if (cpNum >= 44000 && cpNum <= 45999) {
    return { ciudad: 'Guadalajara', estado: 'Jalisco', zona: 'urbana' };
  }

  // Por defecto
  return { zona: 'urbana' };
}

/**
 * Sanitiza input de texto
 */
export function sanitizarTexto(texto: string): string {
  return texto
    .trim()
    .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
    .replace(/[<>]/g, ''); // Remover caracteres HTML básicos
}

/**
 * Valida edad dentro de rango esperado
 */
export function validarEdad(edad: number): ValidacionResultado {
  if (edad < 6 || edad > 15) {
    return {
      valido: true,
      advertencia: true,
      mensaje: 'Cognitiva está optimizado para estudiantes de 9-10 años, pero adaptaremos el contenido para ti'
    };
  }

  return { valido: true };
}
