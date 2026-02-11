// types/onboarding.ts

export type EdadRango = '18-24' | '25-34' | '35-44' | '45-54' | '55+' | 'prefiero-no-decir';
export type NivelEducativo = 'primaria' | 'secundaria' | 'preparatoria' | 'licenciatura' | 'posgrado' | 'prefiero-no-decir';
export type TipoEscuela = 'publica' | 'privada' | 'casa' | 'prefiero-no-decir';
export type Turno = 'matutino' | 'vespertino' | 'completo';
export type Grado = 1 | 2 | 3 | 4 | 5 | 6;
export type FuenteConocimiento = 'google' | 'redes-sociales' | 'recomendacion' | 'maestro' | 'otro';

export interface Step1Data {
  nombreCompleto: string;
  email: string;
  password: string;
  confirmPassword: string;
  aceptaTerminos: boolean;
  comoConocio?: FuenteConocimiento;
  comoConocioOtro?: string;
}

export interface Step2Data {
  edad: EdadRango;
  estado: string;
  ciudad: string;
  nivelEducativo?: NivelEducativo;
  ocupacion?: string;
  numHijosPrimaria: number;
}

export interface Step3Data {
  nombreEstudiante: string;
  edadEstudiante: number;
  grado: Grado;
  tipoEscuela: TipoEscuela;
  turno: Turno;
  haRepetido?: boolean;
  necesidadesEspeciales: string[];
  otraNecesidad?: string;
}

export interface Step4Data {
  motivos: string[];
  otroMotivo?: string;
  materiaApoyo: string[];
  tiempoDedicado: string;
  disfrutaTareas: number;
  familiaridadTecnologia: string;
  observacionesAdicionales?: string;
}

export interface OnboardingData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  planSeleccionado?: 'trial' | 'mensual' | 'trimestral' | 'anual';
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface OnboardingState {
  currentStep: number;
  data: Partial<OnboardingData>;
  errors: ValidationErrors;
  isLoading: boolean;
}
