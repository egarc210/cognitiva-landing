// utils/validation.ts

import { ValidationErrors } from '@/types/onboarding';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  if (!/\d/.test(password)) {
    errors.push('Al menos 1 número');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Al menos 1 mayúscula');
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (errors.length === 0) {
    if (password.length >= 12 && /[!@#$%^&*]/.test(password)) {
      strength = 'strong';
    } else {
      strength = 'medium';
    }
  }

  return {
    isValid: errors.length === 0,
    strength,
    errors,
  };
};

export const validateNombreCompleto = (nombre: string): boolean => {
  return nombre.trim().split(' ').length >= 2;
};

export const validateStep1 = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.nombreCompleto || !validateNombreCompleto(data.nombreCompleto)) {
    errors.nombreCompleto = 'Ingresa tu nombre completo (nombre y apellido)';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Ingresa un correo electrónico válido';
  }

  const passwordValidation = validatePassword(data.password || '');
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors.join(', ');
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  if (!data.aceptaTerminos) {
    errors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
  }

  return errors;
};

export const validateStep2 = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.edad) {
    errors.edad = 'Selecciona tu rango de edad';
  }

  if (!data.estado) {
    errors.estado = 'Selecciona tu estado';
  }

  if (!data.ciudad || data.ciudad.trim().length < 2) {
    errors.ciudad = 'Ingresa tu ciudad';
  }

  if (!data.numHijosPrimaria || data.numHijosPrimaria < 1) {
    errors.numHijosPrimaria = 'Selecciona el número de hijos en primaria';
  }

  return errors;
};

export const validateStep3 = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.nombreEstudiante || data.nombreEstudiante.trim().length < 2) {
    errors.nombreEstudiante = 'Ingresa el nombre de tu hijo(a)';
  }

  if (!data.edadEstudiante || data.edadEstudiante < 6 || data.edadEstudiante > 12) {
    errors.edadEstudiante = 'Selecciona la edad de tu hijo(a)';
  }

  if (!data.grado) {
    errors.grado = 'Selecciona el grado escolar';
  }

  if (!data.tipoEscuela) {
    errors.tipoEscuela = 'Selecciona el tipo de escuela';
  }

  if (!data.turno) {
    errors.turno = 'Selecciona el turno escolar';
  }

  return errors;
};

export const validateStep4 = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.motivos || data.motivos.length === 0) {
    errors.motivos = 'Selecciona al menos un motivo';
  }

  if (data.motivos && data.motivos.length > 3) {
    errors.motivos = 'Selecciona máximo 3 motivos';
  }

  if (!data.materiaApoyo || data.materiaApoyo.length === 0) {
    errors.materiaApoyo = 'Selecciona al menos una materia';
  }

  if (!data.tiempoDedicado) {
    errors.tiempoDedicado = 'Selecciona cuánto tiempo dedicaría';
  }

  if (data.disfrutaTareas === undefined || data.disfrutaTareas === null) {
    errors.disfrutaTareas = 'Selecciona el nivel de disfrute';
  }

  if (!data.familiaridadTecnologia) {
    errors.familiaridadTecnologia = 'Selecciona la familiaridad con tecnología';
  }

  return errors;
};

export const getPasswordStrengthColor = (strength: 'weak' | 'medium' | 'strong'): string => {
  switch (strength) {
    case 'weak':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'strong':
      return 'bg-green-500';
  }
};

export const getPasswordStrengthText = (strength: 'weak' | 'medium' | 'strong'): string => {
  switch (strength) {
    case 'weak':
      return 'Débil';
    case 'medium':
      return 'Media';
    case 'strong':
      return 'Fuerte';
  }
};
