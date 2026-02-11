// components/Step1Account.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Step1Data, FuenteConocimiento } from '@/types/onboarding';
import { validatePassword, getPasswordStrengthColor, getPasswordStrengthText } from '@/utils/validation';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface Step1AccountProps {
  data: Partial<Step1Data>;
  errors: { [key: string]: string };
  onUpdate: (data: Partial<Step1Data>) => void;
  onNext: () => void;
  clearError: (field: string) => void;
}

export const Step1Account: React.FC<Step1AccountProps> = ({
  data,
  errors,
  onUpdate,
  onNext,
  clearError,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  useEffect(() => {
    if (data.password) {
      const validation = validatePassword(data.password);
      setPasswordStrength(validation.strength);
      setPasswordErrors(validation.errors);
    }
  }, [data.password]);

  const handleChange = (field: keyof Step1Data, value: any) => {
    clearError(field);
    onUpdate({ ...data, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isFormValid = 
    data.nombreCompleto &&
    data.email &&
    data.password &&
    data.confirmPassword &&
    data.password === data.confirmPassword &&
    passwordErrors.length === 0 &&
    data.aceptaTerminos;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Empieza tu prueba gratuita
        </h1>
        <p className="text-gray-600">
          Prueba 14 días gratis • Sin tarjeta • Cancela cuando quieras
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre Completo */}
        <div>
          <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            id="nombreCompleto"
            type="text"
            value={data.nombreCompleto || ''}
            onChange={(e) => handleChange('nombreCompleto', e.target.value)}
            placeholder="María González"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.nombreCompleto ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nombreCompleto && (
            <p className="mt-1 text-sm text-red-600">{errors.nombreCompleto}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico *
          </label>
          <input
            id="email"
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="maria@ejemplo.com"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-sm text-gray-500">Lo usarás para iniciar sesión</p>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Crear contraseña *
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={data.password || ''}
              onChange={(e) => handleChange('password', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {data.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Fortaleza:</span>
                <span className={`text-sm font-medium ${
                  passwordStrength === 'weak' ? 'text-red-600' :
                  passwordStrength === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{
                    width: passwordStrength === 'weak' ? '33%' :
                           passwordStrength === 'medium' ? '66%' : '100%'
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-2 space-y-1">
            {['Mínimo 8 caracteres', 'Al menos 1 número', 'Al menos 1 mayúscula'].map((req) => {
              const isMet = !passwordErrors.includes(req);
              return (
                <div key={req} className="flex items-center text-sm">
                  {isMet ? (
                    <Check size={16} className="text-green-600 mr-2" />
                  ) : (
                    <X size={16} className="text-gray-400 mr-2" />
                  )}
                  <span className={isMet ? 'text-green-600' : 'text-gray-600'}>
                    {req}
                  </span>
                </div>
              );
            })}
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña *
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={data.confirmPassword || ''}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Términos y Condiciones */}
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={data.aceptaTerminos || false}
              onChange={(e) => handleChange('aceptaTerminos', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Acepto los{' '}
              <a href="/terminos" target="_blank" className="text-blue-600 hover:underline">
                Términos de Servicio
              </a>{' '}
              y{' '}
              <a href="/privacidad" target="_blank" className="text-blue-600 hover:underline">
                Política de Privacidad
              </a>
            </span>
          </label>
          {errors.aceptaTerminos && (
            <p className="mt-1 text-sm text-red-600">{errors.aceptaTerminos}</p>
          )}
        </div>

        {/* Cómo conociste Cognitiva */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Cómo conociste Cognitiva? (opcional)
          </label>
          <div className="space-y-2">
            {[
              { value: 'google', label: 'Búsqueda en Google' },
              { value: 'redes-sociales', label: 'Redes sociales (Facebook/Instagram)' },
              { value: 'recomendacion', label: 'Recomendación de amigo/familiar' },
              { value: 'maestro', label: 'Maestro/escuela' },
              { value: 'otro', label: 'Otro' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="comoConocio"
                  value={option.value}
                  checked={data.comoConocio === option.value}
                  onChange={(e) => handleChange('comoConocio', e.target.value as FuenteConocimiento)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {data.comoConocio === 'otro' && (
            <input
              type="text"
              value={data.comoConocioOtro || ''}
              onChange={(e) => handleChange('comoConocioOtro', e.target.value)}
              placeholder="Por favor especifica"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
};
