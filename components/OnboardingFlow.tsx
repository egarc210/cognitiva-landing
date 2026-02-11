// components/OnboardingFlow.tsx

'use client';

import React from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { ProgressBar } from './ProgressBar';
import { Step1Account } from './Step1Account';
import { Step2Parent } from './Step2Parent';
import { Step3Student } from './Step3Student';
import { Step4Expectations } from './Step4Expectations';
import { Step5Plan } from './Step5Plan';
import { Step6Confirmation } from './Step6Confirmation';
import { useRouter } from 'next/navigation';

export const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const {
    currentStep,
    data,
    errors,
    isLoading,
    updateStepData,
    nextStep,
    prevStep,
    submitOnboarding,
    clearError,
    totalSteps,
  } = useOnboarding();

  const handleComplete = async () => {
    try {
      await submitOnboarding();
      // Redirigir al cuestionario de clasificación del estudiante
      router.push('/cuestionario-estudiante');
    } catch (error) {
      console.error('Error al completar onboarding:', error);
      alert('Hubo un error al guardar tus datos. Por favor intenta de nuevo.');
    }
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Cognitiva</h1>
        </div>

        {/* Barra de progreso (no mostrar en paso de confirmación) */}
        {currentStep < 6 && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        )}

        {/* Contenedor del formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <Step1Account
              data={data.step1 || {}}
              errors={errors}
              onUpdate={(stepData) => updateStepData('step1', stepData)}
              onNext={nextStep}
              clearError={clearError}
            />
          )}

          {currentStep === 2 && (
            <Step2Parent
              data={data.step2 || {}}
              errors={errors}
              onUpdate={(stepData) => updateStepData('step2', stepData)}
              onNext={nextStep}
              onBack={prevStep}
              clearError={clearError}
            />
          )}

          {currentStep === 3 && (
            <Step3Student
              data={data.step3 || {}}
              errors={errors}
              onUpdate={(stepData) => updateStepData('step3', stepData)}
              onNext={nextStep}
              onBack={prevStep}
              clearError={clearError}
            />
          )}

          {currentStep === 4 && (
            <Step4Expectations
              data={data.step4 || {}}
              errors={errors}
              onUpdate={(stepData) => updateStepData('step4', stepData)}
              onNext={nextStep}
              onBack={prevStep}
              clearError={clearError}
            />
          )}

          {currentStep === 5 && (
            <Step5Plan
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 6 && (
            <Step6Confirmation
              data={data}
              isLoading={isLoading}
              onComplete={handleComplete}
              onDashboard={handleGoToDashboard}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            ¿Necesitas ayuda?{' '}
            <a href="/contacto" className="text-blue-600 hover:underline">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
