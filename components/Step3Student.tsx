// components/Step3Student.tsx

'use client';

import React, { useState } from 'react';
import { Step3Data, TipoEscuela, Turno, Grado } from '@/types/onboarding';
import { NECESIDADES_ESPECIALES } from '@/utils/constants';
import { AlertCircle } from 'lucide-react';

interface Step3StudentProps {
  data: Partial<Step3Data>;
  errors: { [key: string]: string };
  onUpdate: (data: Partial<Step3Data>) => void;
  onNext: () => void;
  onBack: () => void;
  clearError: (field: string) => void;
}

export const Step3Student: React.FC<Step3StudentProps> = ({
  data,
  errors,
  onUpdate,
  onNext,
  onBack,
  clearError,
}) => {
  const [showGradoWarning, setShowGradoWarning] = useState(false);

  const handleChange = (field: keyof Step3Data, value: any) => {
    clearError(field);
    onUpdate({ ...data, [field]: value });

    // Mostrar advertencia si selecciona un grado diferente a 4°
    if (field === 'grado' && value !== 4) {
      setShowGradoWarning(true);
    } else if (field === 'grado' && value === 4) {
      setShowGradoWarning(false);
    }
  };

  const handleNecesidadesChange = (necesidad: string) => {
    const necesidades = data.necesidadesEspeciales || [];
    
    if (necesidad === 'ninguna') {
      // Si selecciona "ninguna", limpiar todas las demás
      handleChange('necesidadesEspeciales', ['ninguna']);
    } else {
      // Si selecciona otra, quitar "ninguna" si estaba
      const newNecesidades = necesidades.includes(necesidad)
        ? necesidades.filter(n => n !== necesidad)
        : [...necesidades.filter(n => n !== 'ninguna'), necesidad];
      
      handleChange('necesidadesEspeciales', newNecesidades);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid =
    data.nombreEstudiante &&
    data.edadEstudiante &&
    data.grado &&
    data.tipoEscuela &&
    data.turno;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ahora, sobre tu hijo(a)
        </h1>
        <p className="text-gray-600">
          Vamos a crear su perfil de aprendizaje
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre del estudiante */}
        <div>
          <label htmlFor="nombreEstudiante" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del estudiante *
          </label>
          <input
            id="nombreEstudiante"
            type="text"
            value={data.nombreEstudiante || ''}
            onChange={(e) => handleChange('nombreEstudiante', e.target.value)}
            placeholder="Sofía"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.nombreEstudiante ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-sm text-gray-500">
            Solo el nombre (sin apellidos por privacidad)
          </p>
          {errors.nombreEstudiante && (
            <p className="mt-1 text-sm text-red-600">{errors.nombreEstudiante}</p>
          )}
        </div>

        {/* Edad */}
        <div>
          <label htmlFor="edadEstudiante" className="block text-sm font-medium text-gray-700 mb-1">
            Edad *
          </label>
          <select
            id="edadEstudiante"
            value={data.edadEstudiante || ''}
            onChange={(e) => handleChange('edadEstudiante', parseInt(e.target.value))}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.edadEstudiante ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona la edad</option>
            {[6, 7, 8, 9, 10, 11, 12].map((edad) => (
              <option key={edad} value={edad}>
                {edad} años
              </option>
            ))}
          </select>
          {errors.edadEstudiante && (
            <p className="mt-1 text-sm text-red-600">{errors.edadEstudiante}</p>
          )}
        </div>

        {/* Grado escolar */}
        <div>
          <label htmlFor="grado" className="block text-sm font-medium text-gray-700 mb-1">
            Grado escolar actual *
          </label>
          <select
            id="grado"
            value={data.grado || ''}
            onChange={(e) => handleChange('grado', parseInt(e.target.value) as Grado)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.grado ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecciona el grado</option>
            {[1, 2, 3, 4, 5, 6].map((grado) => (
              <option key={grado} value={grado}>
                {grado}° Primaria {grado === 4 && '(Recomendado)'}
              </option>
            ))}
          </select>
          {errors.grado && (
            <p className="mt-1 text-sm text-red-600">{errors.grado}</p>
          )}
          
          {/* Advertencia para grados diferentes a 4° */}
          {showGradoWarning && (
            <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex">
                <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" size={20} />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800 mb-1">
                    Actualmente Cognitiva está optimizado para 4° grado
                  </p>
                  <p className="text-yellow-700">
                    ¿Quieres continuar con 4° o unirte a la lista de espera para {data.grado}° grado?
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleChange('grado', 4);
                        setShowGradoWarning(false);
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm font-medium"
                    >
                      Continuar con 4°
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Aquí podrías agregar lógica para lista de espera
                        alert('Funcionalidad de lista de espera próximamente');
                      }}
                      className="px-4 py-2 bg-white text-yellow-700 border border-yellow-600 rounded-md hover:bg-yellow-50 text-sm font-medium"
                    >
                      Lista de espera
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tipo de escuela */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de escuela *
          </label>
          <div className="space-y-2">
            {[
              { value: 'publica', label: 'Pública' },
              { value: 'privada', label: 'Privada' },
              { value: 'casa', label: 'Educación en casa' },
              { value: 'prefiero-no-decir', label: 'Prefiero no decir' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="tipoEscuela"
                  value={option.value}
                  checked={data.tipoEscuela === option.value}
                  onChange={(e) => handleChange('tipoEscuela', e.target.value as TipoEscuela)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.tipoEscuela && (
            <p className="mt-1 text-sm text-red-600">{errors.tipoEscuela}</p>
          )}
        </div>

        {/* Turno escolar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Turno escolar *
          </label>
          <div className="space-y-2">
            {[
              { value: 'matutino', label: 'Matutino' },
              { value: 'vespertino', label: 'Vespertino' },
              { value: 'completo', label: 'Tiempo completo' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="turno"
                  value={option.value}
                  checked={data.turno === option.value}
                  onChange={(e) => handleChange('turno', e.target.value as Turno)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.turno && (
            <p className="mt-1 text-sm text-red-600">{errors.turno}</p>
          )}
        </div>

        {/* Ha repetido algún grado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Tu hijo(a) ha repetido algún grado? (opcional)
          </label>
          <div className="flex gap-4">
            {[
              { value: true, label: 'Sí' },
              { value: false, label: 'No' },
            ].map((option) => (
              <label key={option.label} className="flex items-center">
                <input
                  type="radio"
                  name="haRepetido"
                  checked={data.haRepetido === option.value}
                  onChange={() => handleChange('haRepetido', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Necesidades especiales */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Tiene alguna necesidad educativa especial? (opcional)
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Nos ayuda a adaptar mejor el contenido
          </p>
          <div className="space-y-2">
            {NECESIDADES_ESPECIALES.map((necesidad) => (
              <label key={necesidad.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(data.necesidadesEspeciales || []).includes(necesidad.value)}
                  onChange={() => handleNecesidadesChange(necesidad.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{necesidad.label}</span>
              </label>
            ))}
          </div>
          {(data.necesidadesEspeciales || []).includes('otra') && (
            <input
              type="text"
              value={data.otraNecesidad || ''}
              onChange={(e) => handleChange('otraNecesidad', e.target.value)}
              placeholder="Por favor especifica"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
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
