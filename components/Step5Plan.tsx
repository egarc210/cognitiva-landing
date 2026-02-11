// components/Step5Plan.tsx

'use client';

import React from 'react';
import { PLANES, TRIAL_DAYS } from '@/utils/constants';
import { Check } from 'lucide-react';

interface Step5PlanProps {
  onNext: () => void;
  onBack: () => void;
}

export const Step5Plan: React.FC<Step5PlanProps> = ({ onNext, onBack }) => {
  const handleSelectPlan = (planId: string) => {
    if (planId === 'trial') {
      onNext();
    } else {
      // Los otros planes no están activos en MVP
      alert('Este plan estará disponible próximamente');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Elige tu plan
        </h1>
        <p className="text-gray-600">
          Comienza con {TRIAL_DAYS} días gratis, sin tarjeta de crédito
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {PLANES.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl border-2 p-6 flex flex-col ${
              plan.destacado
                ? 'border-blue-600 shadow-xl scale-105'
                : plan.activo
                ? 'border-green-600 shadow-xl'
                : 'border-gray-300'
            }`}
          >
            {/* Badge */}
            {plan.destacado && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                POPULAR
              </div>
            )}
            {plan.id === 'anual' && !plan.destacado && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                MEJOR VALOR
              </div>
            )}
            {plan.activo && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                ¡GRATIS!
              </div>
            )}

            {/* Contenido del plan */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.nombre}
              </h3>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.precio}
                </span>
                <span className="text-gray-600 ml-2">
                  MXN/{plan.periodo}
                </span>
              </div>

              {plan.ahorro && (
                <div className="mb-2 px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded inline-block">
                  Ahorra {plan.ahorro}
                </div>
              )}

              {plan.precioMensual && (
                <p className="text-sm text-gray-600 mb-2">
                  ${plan.precioMensual} MXN/mes
                </p>
              )}

              <p className="text-sm text-gray-600 mb-4">
                {plan.descripcion}
              </p>

              {plan.beneficio && (
                <p className="text-sm font-medium text-blue-600 mb-4">
                  🎁 {plan.beneficio}
                </p>
              )}

              {plan.beneficios && (
                <ul className="space-y-2 mb-4">
                  {plan.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <Check size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      {beneficio}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Botón */}
            <button
              onClick={() => handleSelectPlan(plan.id)}
              disabled={!plan.activo}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                plan.activo
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                  : plan.destacado
                  ? 'bg-blue-100 text-blue-800 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              {plan.activo ? 'Empezar prueba gratis' : 'Próximamente'}
            </button>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="text-center bg-blue-50 rounded-lg p-6 mb-6">
        <p className="text-gray-700 mb-2">
          Después de tu prueba, podrás elegir el plan que prefieras.
        </p>
        <p className="text-sm text-gray-600">
          Te avisaremos 3 días antes de que termine tu período gratuito.
        </p>
      </div>

      {/* Botón Atrás */}
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-all"
        >
          ← Volver atrás
        </button>
      </div>
    </div>
  );
};
