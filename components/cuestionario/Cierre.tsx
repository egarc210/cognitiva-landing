// ============================================
// COMPONENTE: Cierre (Resultados)
// ============================================

'use client';

import React from 'react';
import { CuestionarioCompleto } from '@/lib/cuestionario/types';
import { generarRecomendaciones } from '@/lib/cuestionario/puntuacion';

interface CierreProps {
  resultado: CuestionarioCompleto;
}

export function Cierre({ resultado }: CierreProps) {
  const { 
    perfil_demografico, 
    estilo_aprendizaje, 
    intereses, 
    nivel_academico 
  } = resultado;

  const recomendaciones = generarRecomendaciones(
    estilo_aprendizaje,
    intereses,
    nivel_academico
  );

  // Mapeo de estilos a descripciones amigables
  const estiloDescripcion: Record<string, { titulo: string; descripcion: string; icono: string }> = {
    visual: {
      titulo: 'Visual',
      descripcion: 'Aprendes mejor con imágenes, diagramas y colores',
      icono: '👁️'
    },
    verbal: {
      titulo: 'Verbal/Lingüístico',
      descripcion: 'Aprendes mejor leyendo, escribiendo y escuchando',
      icono: '📖'
    },
    kinestesico: {
      titulo: 'Kinestésico',
      descripcion: 'Aprendes mejor haciendo y experimentando',
      icono: '🤸'
    },
    multimodal: {
      titulo: 'Multimodal',
      descripcion: 'Combinas varios estilos de aprendizaje',
      icono: '🌟'
    }
  };

  const estiloInfo = estiloDescripcion[estilo_aprendizaje.dominante];

  // Mapeo de intereses a iconos
  const interesIconos: Record<string, string> = {
    deportes: '⚽',
    arte: '🎨',
    lectura: '📚',
    tecnologia: '🎮',
    ciencia: '🔬',
    musica: '🎵',
    animales: '🐕',
    construccion: '🧱',
    cocina: '🍳',
    matematicas: '🧠'
  };

  // Mapeo de nivel académico
  const nivelDescripcion: Record<string, { texto: string; color: string }> = {
    avanzado: { texto: 'Avanzado', color: 'bg-green-100 text-green-700' },
    nivel: { texto: 'Al nivel', color: 'bg-blue-100 text-blue-700' },
    refuerzo: { texto: 'En desarrollo', color: 'bg-yellow-100 text-yellow-700' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Celebración inicial */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="text-8xl animate-bounce">
            🎊
          </div>
          <h1 className="text-5xl font-bold text-gray-800">
            ¡Excelente, {perfil_demografico.nombre}!
          </h1>
          <p className="text-xl text-gray-600">
            Ya tenemos todo listo para personalizar tu aprendizaje
          </p>
        </div>

        {/* Card de resultados */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          
          {/* Tu perfil de aprendizaje */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-3xl">{estiloInfo.icono}</span>
              Tu estilo de aprendizaje
            </h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 space-y-3">
              <h3 className="text-2xl font-bold text-blue-700">
                {estiloInfo.titulo}
              </h3>
              <p className="text-lg text-gray-700">
                {estiloInfo.descripcion}
              </p>
              
              {/* Scores visuales */}
              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-3">
                  <span className="w-24 text-sm text-gray-600">Visual:</span>
                  <div className="flex-grow bg-white rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all"
                      style={{ width: `${(estilo_aprendizaje.visual_score / 6) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm font-semibold text-gray-700">
                    {estilo_aprendizaje.visual_score}/6
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="w-24 text-sm text-gray-600">Verbal:</span>
                  <div className="flex-grow bg-white rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full rounded-full transition-all"
                      style={{ width: `${(estilo_aprendizaje.verbal_score / 6) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm font-semibold text-gray-700">
                    {estilo_aprendizaje.verbal_score}/6
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="w-24 text-sm text-gray-600">Kinestésico:</span>
                  <div className="flex-grow bg-white rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-orange-500 h-full rounded-full transition-all"
                      style={{ width: `${(estilo_aprendizaje.kinestesico_score / 6) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm font-semibold text-gray-700">
                    {estilo_aprendizaje.kinestesico_score}/6
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Tus intereses */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              Tus intereses favoritos
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {intereses.principales.map((interes) => (
                <div 
                  key={interes}
                  className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-3 rounded-full border-2 border-green-200"
                >
                  <span className="text-xl mr-2">{interesIconos[interes]}</span>
                  <span className="font-semibold text-green-700 capitalize">
                    {interes}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Tu nivel académico */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Tu nivel académico
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Matemáticas */}
              <div className="bg-purple-50 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">Matemáticas</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    nivelDescripcion[nivel_academico.matematicas.nivel].color
                  }`}>
                    {nivelDescripcion[nivel_academico.matematicas.nivel].texto}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {nivel_academico.matematicas.correctas} de {nivel_academico.matematicas.total} correctas
                </p>
              </div>
              
              {/* Español */}
              <div className="bg-pink-50 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">Español</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    nivelDescripcion[nivel_academico.español.nivel].color
                  }`}>
                    {nivelDescripcion[nivel_academico.español.nivel].texto}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {nivel_academico.español.correctas} de {nivel_academico.español.total} correctas
                </p>
              </div>
            </div>
          </section>

          {/* Recomendaciones */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-3xl">💡</span>
              Recomendaciones para ti
            </h2>
            
            <div className="space-y-3">
              {recomendaciones.map((recomendacion, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 bg-yellow-50 rounded-xl p-4 border border-yellow-200"
                >
                  <span className="text-xl flex-shrink-0">✓</span>
                  <p className="text-gray-700">{recomendacion}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Botón para continuar */}
        <div className="text-center">
          <button
            onClick={() => {
              // En producción, redirigir al dashboard
              window.location.href = '/dashboard';
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl py-5 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Ir a mi dashboard 🚀
          </button>
        </div>

        {/* Información de datos */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Tus datos están guardados de forma segura 🔒
          </p>
          <button
            onClick={() => {
              const json = JSON.stringify(resultado, null, 2);
              console.log('Resultado completo:', json);
              
              // Descargar JSON (para desarrollo)
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `perfil_${perfil_demografico.nombre}_${Date.now()}.json`;
              a.click();
            }}
            className="mt-2 text-xs text-blue-600 hover:underline"
          >
            Descargar mis resultados (JSON)
          </button>
        </div>
      </div>
    </div>
  );
}
