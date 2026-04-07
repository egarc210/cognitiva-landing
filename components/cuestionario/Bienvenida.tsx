// ============================================
// COMPONENTE: Bienvenida
// ============================================

'use client';

import React from 'react';

interface BienvenidaProps {
  onComenzar: () => void;
}

export function Bienvenida({ onComenzar }: BienvenidaProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center space-y-8">
          
          {/* Mascota/Ícono */}
          <div className="text-8xl animate-bounce">
            👋
          </div>
          
          {/* Título */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              ¡Hola! Soy Sabio
            </h1>
            <p className="text-xl text-gray-600">
              Tu compañero de aprendizaje en Cognitiva
            </p>
          </div>
          
          {/* Descripción */}
          <div className="space-y-4 text-left bg-blue-50 rounded-2xl p-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Vamos a conocerte para crear <span className="font-semibold text-blue-600">ejercicios perfectos para ti</span>.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <span className="text-gray-700">Solo 5 minutos</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-gray-700">Sin respuestas incorrectas</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <span className="text-gray-700">Ejercicios personalizados</span>
              </div>
            </div>
          </div>
          
          {/* Nota importante */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              💡 <span className="font-semibold">Recuerda:</span> No hay respuestas buenas o malas, 
              solo queremos saber qué es lo mejor para ti.
            </p>
          </div>
          
          {/* Botón de inicio */}
          <button
            onClick={onComenzar}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <span>¡Empecemos!</span>
            <span className="text-2xl">🚀</span>
          </button>
          
          {/* Información adicional */}
          <p className="text-xs text-gray-400 mt-4">
            Tu información está segura con nosotros 🔒
          </p>
        </div>
      </div>
    </div>
  );
}
