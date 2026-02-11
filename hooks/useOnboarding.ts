// hooks/useOnboarding.ts

'use client';

import { useState, useCallback } from 'react';
import { OnboardingData, ValidationErrors } from '@/types/onboarding';
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
} from '@/utils/validation';

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateStepData = useCallback((step: keyof OnboardingData, stepData: any) => {
    setData((prev) => ({
      ...prev,
      [step]: stepData,
    }));
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    let stepErrors: ValidationErrors = {};

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1(data.step1 || {});
        break;
      case 2:
        stepErrors = validateStep2(data.step2 || {});
        break;
      case 3:
        stepErrors = validateStep3(data.step3 || {});
        break;
      case 4:
        stepErrors = validateStep4(data.step4 || {});
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [currentStep, data]);

  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validateCurrentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const submitOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      // Aquí integrarás con tu API
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en submitOnboarding:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    currentStep,
    data,
    errors,
    isLoading,
    updateStepData,
    nextStep,
    prevStep,
    goToStep,
    submitOnboarding,
    clearError,
    totalSteps: 6,
  };
};
