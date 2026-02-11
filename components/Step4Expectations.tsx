// components/Step4Expectations.tsx

'use client';

import React from 'react';
import { Step4Data } from '@/types/onboarding';
import {
  MOTIVOS_USO,
  MATERIAS_APOYO,
  TIEMPO_DEDICADO,
  FAMILIARIDAD_TECNOLOGIA,
} from '@/utils/constants';

interface Step4ExpectationsProps {
  data: Partial<Step4Data>;
  errors: { [key: string]: string };
  onUpdate: (data: Partial<Step4Data>) => void;
  onNext: () => void;
  onBack: () => void;
  clearError: (field: string) => void;
}

export const Step4Expectations: React.FC<Step4ExpectationsProps> = ({
  data,
  errors,
  onUpdate,
  onNext,
  onBack,
  clearError,
}) => {
  const handleMotivosChange = (motivo: string) => {
    const motivos = data.motivos || [];
    const newMotivos = motivos.includes(motivo)
      ? motivos.filter((m) => m !== motivo)
      : [...motivos, motivo];

    // Limitar a 3 selecciones
    if (newMotivos.length <= 3) {
      clearError('motivos');
      onUpdate({ ...data, motivos: newMotivos });
    }
  };

  const handleMateriasChange = (materia: string) => {
    const materias = data.materiaApoyo || [];
    const newMaterias = materias.includes(materia)
      ? materias.filter((m) => m !== materia)
      : [...materias, materia];

    clearError('materiaApoyo');
    onUpdate({ ...data, materiaApoyo: newMaterias });
  };

  const handleSliderChange = (value: number) => {
    clearError('disfrutaTareas');
    onUpdate({ ...data, disfrutaTareas: value });
  };

  const handleChange = (field: keyof Step4Data, value: any) => {
    clearError(field);
    onUpdate({ ...data, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid =
    data.motivos &&
    data.motivos.length > 0 &&
    data.motivos.length <= 3 &&
    data.materiaApoyo &&
    data.materiaApoyo.length > 0 &&
    data.tiempoDedicado &&
    data.disfrutaTareas !== undefined &&
    data.disfrutaTareas !== null &&
    data.familiaridadTecnologia;

  const getEmojiForSlider = (value: number) => {
    if (value <= 33) return '😞';
    if (value <= 66) return '😐';
    return '😊';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¿Qué esperas de Cognitiva?
        </h1>
        <p className="text-gray-600">
          Queremos asegurarnos de ayudarte con lo que más importa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Motivos para usar Cognitiva */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Principal motivo para usar Cognitiva * (máximo 3)
          </label>
          <div className="text-sm text-gray-500 mb-3">
            {data.motivos?.length || 0} de 3 seleccionados
          </div>
          <div className="space-y-2">
            {MOTIVOS_USO.map((motivo) => (
              <label
                key={motivo.value}
                className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  (data.motivos || []).includes(motivo.value)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(data.motivos || []).includes(motivo.value)}
                  onChange={() => handleMotivosChange(motivo.value)}
                  disabled={
                    !!(data.motivos || []).length >= 3 &&
                    !(data.motivos || []).includes(motivo.value)
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span className="ml-3 text-sm text-gray-700">{motivo.label}</span>
              </label>
            ))}
          </div>
          {(data.motivos || []).includes('otro') && (
            <input
              type="text"
              value={data.otroMotivo || ''}
              onChange={(e) => handleChange('otroMotivo', e.target.value)}
              placeholder="Por favor especifica"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          )}
          {errors.motivos && (
            <p className="mt-2 text-sm text-red-600">{errors.motivos}</p>
          )}
        </div>

        {/* Materia de apoyo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿En qué materia necesita más apoyo? *
          </label>
          <div className="space-y-2">
            {MATERIAS_APOYO.map((materia) => (
              <label
                key={materia.value}
                className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  (data.materiaApoyo || []).includes(materia.value)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(data.materiaApoyo || []).includes(materia.value)}
                  onChange={() => handleMateriasChange(materia.value)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                />
                <span className="ml-3 text-sm text-gray-700">{materia.label}</span>
              </label>
            ))}
          </div>
          {errors.materiaApoyo && (
            <p className="mt-2 text-sm text-red-600">{errors.materiaApoyo}</p>
          )}
        </div>

        {/* Tiempo dedicado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Cuánto tiempo dedicaría tu hijo(a) a Cognitiva? *
          </label>
          <div className="space-y-2">
            {TIEMPO_DEDICADO.map((tiempo) => (
              <label key={tiempo.value} className="flex items-center">
                <input
                  type="radio"
                  name="tiempoDedicado"
                  value={tiempo.value}
                  checked={data.tiempoDedicado === tiempo.value}
                  onChange={(e) => handleChange('tiempoDedicado', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{tiempo.label}</span>
              </label>
            ))}
          </div>
          {errors.tiempoDedicado && (
            <p className="mt-2 text-sm text-red-600">{errors.tiempoDedicado}</p>
          )}
        </div>

        {/* Disfrute de tareas - Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Tu hijo(a) actualmente disfruta hacer tareas? *
          </label>
          <div className="px-2">
            <div className="flex justify-between text-2xl mb-2">
              <span>😞</span>
              <span>😐</span>
              <span>😊</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={data.disfrutaTareas || 50}
              onChange={(e) => handleSliderChange(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Nada</span>
              <span>Neutral</span>
              <span>Mucho</span>
            </div>
          </div>
          {errors.disfrutaTareas && (
            <p className="mt-2 text-sm text-red-600">{errors.disfrutaTareas}</p>
          )}
        </div>

        {/* Familiaridad con tecnología */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Qué tan familiarizado está con tecnología? *
          </label>
          <div className="space-y-2">
            {FAMILIARIDAD_TECNOLOGIA.map((opcion) => (
              <label key={opcion.value} className="flex items-center">
                <input
                  type="radio"
                  name="familiaridadTecnologia"
                  value={opcion.value}
                  checked={data.familiaridadTecnologia === opcion.value}
                  onChange={(e) => handleChange('familiaridadTecnologia', e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{opcion.label}</span>
              </label>
            ))}
          </div>
          {errors.familiaridadTecnologia && (
            <p className="mt-2 text-sm text-red-600">{errors.familiaridadTecnologia}</p>
          )}
        </div>

        {/* Observaciones adicionales */}
        <div>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
            ¿Algo más que debamos saber? (opcional)
          </label>
          <textarea
            id="observaciones"
            value={data.observacionesAdicionales || ''}
            onChange={(e) => handleChange('observacionesAdicionales', e.target.value)}
            placeholder="Ej: Le cuesta concentrarse, aprende mejor en las mañanas, le encantan los dinosaurios..."
            maxLength={200}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
          <div className="text-sm text-gray-500 text-right mt-1">
            {(data.observacionesAdicionales || '').length}/200 caracteres
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 py-3 px-6 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:bg-gray-50 transition-all"
          >
            Atrás
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-2/3 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};
