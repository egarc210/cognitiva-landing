// ============================================
// COMPONENTE: Barra de Progreso
// ============================================

'use client';

import React from 'react';

interface BarraProgresoProps {
  progreso: number; // 0-100
  preguntaActual: number;
  totalPreguntas: number;
  className?: string;
}

export function BarraProgreso({ 
  progreso, 
  preguntaActual, 
  totalPreguntas,
  className = ''
}: BarraProgresoProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Texto de progreso */}
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className="text-gray-600 font-medium">
          Pregunta {preguntaActual + 1} de {totalPreguntas}
        </span>
        <span className="text-blue-600 font-semibold">
          {progreso}%
        </span>
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${progreso}%` }}
        >
          {/* Brillo animado */}
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

// Estilos para la animación de brillo (agregar a tailwind.config.js)
/*
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      }
    }
  }
}
*/
