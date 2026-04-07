// ============================================
// COMPONENTE: Pregunta (Reutilizable)
// ============================================

'use client';

import React, { useState, useEffect } from 'react';
import { Pregunta as PreguntaType } from '@/lib/cuestionario/types';

interface PreguntaProps {
  pregunta: PreguntaType;
  valor?: any;
  onChange: (valor: any) => void;
  error?: string;
}

export function Pregunta({ pregunta, valor, onChange, error }: PreguntaProps) {
  const [valorInterno, setValorInterno] = useState(valor || '');
  
  useEffect(() => {
    setValorInterno(valor || (pregunta.tipo === 'opcion_multiple' ? [] : ''));
  }, [valor, pregunta.tipo]);

  const handleChange = (nuevoValor: any) => {
    setValorInterno(nuevoValor);
    onChange(nuevoValor);
  };

  // Renderizar según tipo de pregunta
  switch (pregunta.tipo) {
    case 'texto':
      return <PreguntaTexto pregunta={pregunta} valor={valorInterno} onChange={handleChange} error={error} />;
    
    case 'numero':
      return <PreguntaNumero pregunta={pregunta} valor={valorInterno} onChange={handleChange} error={error} />;
    
    case 'opcion_unica':
      return <PreguntaOpcionUnica pregunta={pregunta} valor={valorInterno} onChange={handleChange} />;
    
    case 'opcion_multiple':
      return <PreguntaOpcionMultiple pregunta={pregunta} valores={valorInterno} onChange={handleChange} />;
    
    default:
      return <div>Tipo de pregunta no soportado</div>;
  }
}

// ============================================
// PREGUNTA TIPO TEXTO
// ============================================

function PreguntaTexto({ 
  pregunta, 
  valor, 
  onChange, 
  error 
}: { 
  pregunta: PreguntaType; 
  valor: string; 
  onChange: (v: string) => void; 
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={pregunta.placeholder}
        className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <span>⚠️</span> {error}
        </p>
      )}
      {pregunta.tooltip && !error && (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>💡</span> {pregunta.tooltip}
        </p>
      )}
    </div>
  );
}

// ============================================
// PREGUNTA TIPO NÚMERO
// ============================================

function PreguntaNumero({ 
  pregunta, 
  valor, 
  onChange, 
  error 
}: { 
  pregunta: PreguntaType; 
  valor: string; 
  onChange: (v: string) => void; 
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={valor}
        onChange={(e) => {
          const num = e.target.value.replace(/\D/g, '');
          onChange(num);
        }}
        placeholder={pregunta.placeholder}
        className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center font-mono text-2xl ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-300'
        }`}
        maxLength={5}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <span>⚠️</span> {error}
        </p>
      )}
      {pregunta.tooltip && !error && (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>💡</span> {pregunta.tooltip}
        </p>
      )}
    </div>
  );
}

// ============================================
// PREGUNTA TIPO OPCIÓN ÚNICA
// ============================================

function PreguntaOpcionUnica({ 
  pregunta, 
  valor, 
  onChange 
}: { 
  pregunta: PreguntaType; 
  valor: string; 
  onChange: (v: string) => void; 
}) {
  return (
    <div className="space-y-3">
      {pregunta.opciones?.map((opcion) => (
        <button
          key={opcion.valor}
          onClick={() => onChange(opcion.valor)}
          className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
            valor === opcion.valor
              ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          {/* Icono */}
          {opcion.icono && (
            <span className="text-4xl flex-shrink-0">{opcion.icono}</span>
          )}
          
          {/* Texto */}
          <span className={`text-lg flex-grow ${
            valor === opcion.valor ? 'font-semibold text-blue-700' : 'text-gray-700'
          }`}>
            {opcion.etiqueta}
          </span>
          
          {/* Indicador de selección */}
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            valor === opcion.valor 
              ? 'border-blue-500 bg-blue-500' 
              : 'border-gray-300'
          }`}>
            {valor === opcion.valor && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      ))}
      
      {pregunta.tooltip && (
        <p className="text-sm text-gray-500 flex items-center gap-2 mt-4">
          <span>💡</span> {pregunta.tooltip}
        </p>
      )}
    </div>
  );
}

// ============================================
// PREGUNTA TIPO OPCIÓN MÚLTIPLE
// ============================================

function PreguntaOpcionMultiple({ 
  pregunta, 
  valores, 
  onChange 
}: { 
  pregunta: PreguntaType; 
  valores: string[]; 
  onChange: (v: string[]) => void; 
}) {
  const handleToggle = (valor: string) => {
    const actualizado = valores.includes(valor)
      ? valores.filter(v => v !== valor)
      : [...valores, valor];
    
    onChange(actualizado);
  };

  const maxSeleccion = 3;
  const puedeSeleccionarMas = valores.length < maxSeleccion;

  return (
    <div className="space-y-3">
      {/* Indicador de selecciones */}
      <div className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 flex items-center justify-between">
        <span>✓ Seleccionadas: {valores.length} de {maxSeleccion}</span>
        {!puedeSeleccionarMas && (
          <span className="text-orange-600 font-semibold">Máximo alcanzado</span>
        )}
      </div>
      
      {pregunta.opciones?.map((opcion) => {
        const seleccionado = valores.includes(opcion.valor);
        const deshabilitado = !seleccionado && !puedeSeleccionarMas;
        
        return (
          <button
            key={opcion.valor}
            onClick={() => !deshabilitado && handleToggle(opcion.valor)}
            disabled={deshabilitado}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
              seleccionado
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : deshabilitado
                ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            {/* Checkbox */}
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
              seleccionado 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-300'
            }`}>
              {seleccionado && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            {/* Icono */}
            {opcion.icono && (
              <span className="text-3xl flex-shrink-0">{opcion.icono}</span>
            )}
            
            {/* Texto */}
            <span className={`flex-grow ${
              seleccionado ? 'font-semibold text-blue-700' : 'text-gray-700'
            }`}>
              {opcion.etiqueta}
            </span>
          </button>
        );
      })}
    </div>
  );
}
