// ============================================
// COMPONENTE PRINCIPAL: Cuestionario
// ============================================

'use client';

import React, { useState } from 'react';
import { useCuestionario } from '@/hooks/useCuestionario';
import { Bienvenida } from './Bienvenida';
import { BarraProgreso } from './BarraProgreso';
import { Pregunta } from './Pregunta';
import { Cierre } from './Cierre';
import { todasLasSecciones } from '@/lib/cuestionario/preguntas';

type Estado = 'bienvenida' | 'cuestionario' | 'cierre';

export function CuestionarioContainer() {
  const [estado, setEstado] = useState<Estado>('bienvenida');
  const cuestionario = useCuestionario();

  // Bienvenida
  if (estado === 'bienvenida') {
    return <Bienvenida onComenzar={() => setEstado('cuestionario')} />;
  }

  // Pantalla de cierre/resultado
  if (estado === 'cierre') {
    const resultado = cuestionario.finalizarCuestionario();
    return <Cierre resultado={resultado} />;
  }

  // Cuestionario principal
  const {
    seccionActualObj,
    preguntaActualObj,
    respuestas,
    responder,
    siguientePregunta,
    preguntaAnterior,
    puedeAvanzar,
    totalPreguntas,
    preguntasRespondidas,
    porcentajeCompletado,
    seccionActual,
    preguntaActual
  } = cuestionario;

  const esUltimaPregunta = 
    seccionActual === todasLasSecciones.length - 1 && 
    preguntaActual === seccionActualObj.preguntas.length - 1;

  const esPrimeraPregunta = seccionActual === 0 && preguntaActual === 0;

  // Calcular número de pregunta global
  const preguntaGlobal = todasLasSecciones
    .slice(0, seccionActual)
    .reduce((sum, sec) => sum + sec.preguntas.length, 0) + preguntaActual;

  const handleSiguiente = () => {
    if (esUltimaPregunta) {
      setEstado('cierre');
    } else {
      siguientePregunta();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Barra de progreso superior */}
        <div className="mb-8">
          <BarraProgreso 
            progreso={porcentajeCompletado}
            preguntaActual={preguntaGlobal}
            totalPreguntas={totalPreguntas}
          />
        </div>

        {/* Card de pregunta */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          
          {/* Encabezado de sección */}
          <div className="text-center space-y-2 border-b pb-6">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-sm font-semibold text-blue-700">
                {seccionActualObj.titulo}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {seccionActualObj.descripcion}
            </p>
          </div>

          {/* Pregunta */}
          <div className="space-y-6">
            {/* Texto de la pregunta */}
            <div className="flex items-start gap-4">
              {preguntaActualObj.icono && (
                <span className="text-5xl flex-shrink-0">
                  {preguntaActualObj.icono}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex-grow">
                {preguntaActualObj.texto}
              </h2>
            </div>

            {/* Componente de pregunta */}
            <Pregunta
              pregunta={preguntaActualObj}
              valor={respuestas[preguntaActualObj.id]}
              onChange={(valor) => responder(preguntaActualObj.id, valor)}
            />
          </div>

          {/* Botones de navegación */}
          <div className="flex gap-4 pt-6 border-t">
            {/* Botón Atrás */}
            <button
              onClick={preguntaAnterior}
              disabled={esPrimeraPregunta}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                esPrimeraPregunta
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
              }`}
            >
              ← Atrás
            </button>

            {/* Botón Siguiente/Finalizar */}
            <button
              onClick={handleSiguiente}
              disabled={!puedeAvanzar}
              className={`flex-grow px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                !puedeAvanzar
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {esUltimaPregunta ? '¡Finalizar! 🎉' : 'Siguiente →'}
            </button>
          </div>
        </div>

        {/* Indicador de auto-guardado */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            💾 Tu progreso se guarda automáticamente
          </p>
        </div>
      </div>
    </div>
  );
}
