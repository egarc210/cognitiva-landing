// components/Step6Confirmation.tsx

'use client';

import React, { useEffect } from 'react';
import { OnboardingData } from '@/types/onboarding';
import { TRIAL_DAYS } from '@/utils/constants';
import { CheckCircle, Calendar, Mail, BookOpen } from 'lucide-react';

interface Step6ConfirmationProps {
  data: Partial<OnboardingData>;
  isLoading: boolean;
  onComplete: () => void;
  onDashboard: () => void;
}

export const Step6Confirmation: React.FC<Step6ConfirmationProps> = ({
  data,
  isLoading,
  onComplete,
  onDashboard,
}) => {
  const nombrePadre = data.step1?.nombreCompleto?.split(' ')[0] || 'Usuario';
  const nombreHijo = data.step3?.nombreEstudiante || 'tu hijo(a)';
  const email = data.step1?.email || '';
  
  const fechaFinPrueba = new Date();
  fechaFinPrueba.setDate(fechaFinPrueba.getDate() + TRIAL_DAYS);
  const fechaFormateada = fechaFinPrueba.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Animación de confeti (simple)
  useEffect(() => {
    // Aquí podrías agregar una librería de confeti
    // Por ahora solo un timeout para simular
    console.log('¡Registro completado! 🎉');
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Animación de éxito */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          ¡Bienvenido(a) a Cognitiva, {nombrePadre}!
        </h1>
        
        <p className="text-xl text-gray-700 mb-2">
          Tu cuenta está lista
        </p>
        
        <p className="text-gray-600">
          Ahora vamos a conocer mejor a {nombreHijo} para crear ejercicios perfectos para él/ella
        </p>
      </div>

      {/* Información de la cuenta */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 space-y-4">
        <div className="flex items-start">
          <Calendar className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-gray-900">
              Tu prueba gratuita termina el {fechaFormateada}
            </p>
            <p className="text-sm text-gray-600">
              {TRIAL_DAYS} días de acceso completo
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Mail className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-gray-900">
              Correo de confirmación enviado
            </p>
            <p className="text-sm text-gray-600">
              {email}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <BookOpen className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-medium text-gray-900">
              Acceso completo incluido
            </p>
            <p className="text-sm text-gray-600">
              Matemáticas y Español de 4° grado
            </p>
          </div>
        </div>
      </div>

      {/* Siguiente paso */}
      <div className="bg-white rounded-xl border-2 border-blue-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          📝 Siguiente paso: Cuestionario de clasificación
        </h2>
        <p className="text-gray-700 mb-4">
          Para personalizar el contenido, {nombreHijo} responderá un breve cuestionario que nos ayudará a entender su nivel actual en Matemáticas y Español.
        </p>
        <ul className="space-y-2 text-sm text-gray-600 mb-4">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Toma aproximadamente 10-15 minutos
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            No es un examen, no hay respuestas incorrectas
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Puede hacerlo solo(a) o con tu ayuda
          </li>
        </ul>
      </div>

      {/* Botones de acción */}
      <div className="space-y-4">
        <button
          onClick={onComplete}
          disabled={isLoading}
          className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : (
            `Crear perfil de ${nombreHijo} →`
          )}
        </button>

        <button
          onClick={onDashboard}
          className="w-full py-3 px-6 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-all"
        >
          Prefiero explorar primero
        </button>
      </div>

      {/* Nota de privacidad */}
      <p className="text-xs text-center text-gray-500 mt-6">
        🔒 Tus datos están protegidos. Lee nuestra{' '}
        <a href="/privacidad" className="text-blue-600 hover:underline">
          Política de Privacidad
        </a>
      </p>
    </div>
  );
};
