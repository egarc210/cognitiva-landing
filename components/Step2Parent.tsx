// components/Step2Parent.tsx

'use client';

import React from 'react';
import { Step2Data, EdadRango, NivelEducativo } from '@/types/onboarding';
import { ESTADOS_MEXICO } from '@/utils/constants';

interface Step2ParentProps {
  data: Partial<Step2Data>;
  errors: { [key: string]: string };
  onUpdate: (data: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  clearError: (field: string) => void;
}

export const Step2Parent: React.FC<Step2ParentProps> = ({
  data,
  errors,
  onUpdate,
  onNext,
  onBack,
  clearError,
}) => {
  const handleChange = (field: keyof Step2Data, value: any) => {
    clearError(field);
    onUpdate({ ...data, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid =
    data.edad &&
    data.estado &&
    data.ciudad &&
    data.numHijosPrimaria &&
    data.numHijosPrimaria > 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cuéntanos sobre ti
        </h1>
        <p className="text-gray-600">
          Esto nos ayuda a personalizar la experiencia para tu familia
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Edad */}
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-1">
            Edad *
          </label>
          <select
            id="edad"
            value={data.edad || ''}
            onChange={(e) => handleChange('edad', e.target.value as EdadRango)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.edad ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona tu rango de edad</option>
            <option value="18-24">18-24 años</option>
            <option value="25-34">25-34 años</option>
            <option value="35-44">35-44 años</option>
            <option value="45-54">45-54 años</option>
            <option value="55+">55+ años</option>
            <option value="prefiero-no-decir">Prefiero no decir</option>
          </select>
          {errors.edad && (
            <p className="mt-1 text-sm text-red-600">{errors.edad}</p>
          )}
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
            Estado *
          </label>
          <select
            id="estado"
            value={data.estado || ''}
            onChange={(e) => handleChange('estado', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.estado ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona tu estado</option>
            {ESTADOS_MEXICO.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          {errors.estado && (
            <p className="mt-1 text-sm text-red-600">{errors.estado}</p>
          )}
        </div>

        {/* Ciudad */}
        <div>
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad *
          </label>
          <input
            id="ciudad"
            type="text"
            value={data.ciudad || ''}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            placeholder="Ciudad de México"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.ciudad ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-sm text-gray-500">
            Para contenido regional relevante
          </p>
          {errors.ciudad && (
            <p className="mt-1 text-sm text-red-600">{errors.ciudad}</p>
          )}
        </div>

        {/* Nivel Educativo */}
        <div>
          <label htmlFor="nivelEducativo" className="block text-sm font-medium text-gray-700 mb-1">
            Nivel educativo (opcional)
          </label>
          <select
            id="nivelEducativo"
            value={data.nivelEducativo || ''}
            onChange={(e) => handleChange('nivelEducativo', e.target.value as NivelEducativo)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Selecciona tu nivel educativo</option>
            <option value="primaria">Primaria</option>
            <option value="secundaria">Secundaria</option>
            <option value="preparatoria">Preparatoria</option>
            <option value="licenciatura">Licenciatura</option>
            <option value="posgrado">Posgrado</option>
            <option value="prefiero-no-decir">Prefiero no decir</option>
          </select>
        </div>

        {/* Ocupación */}
        <div>
          <label htmlFor="ocupacion" className="block text-sm font-medium text-gray-700 mb-1">
            Ocupación (opcional)
          </label>
          <input
            id="ocupacion"
            type="text"
            value={data.ocupacion || ''}
            onChange={(e) => handleChange('ocupacion', e.target.value)}
            placeholder="Ingeniero, Maestra, Hogar, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Número de hijos en primaria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Número de hijos en primaria *
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleChange('numHijosPrimaria', num)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  data.numHijosPrimaria === num
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {num === 4 ? '4+' : num}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            En esta prueba registrarás 1, podrás agregar más después
          </p>
          {errors.numHijosPrimaria && (
            <p className="mt-1 text-sm text-red-600">{errors.numHijosPrimaria}</p>
          )}
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
