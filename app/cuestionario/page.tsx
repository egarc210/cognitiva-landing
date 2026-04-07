// ============================================
// PÁGINA: Cuestionario (/app/cuestionario/page.tsx)
// ============================================

import { CuestionarioContainer } from '@/components/cuestionario/CuestionarioContainer';

export const metadata = {
  title: 'Cuestionario Inicial - Cognitiva',
  description: 'Cuestionario de perfil para personalizar tu experiencia de aprendizaje',
};

export default function CuestionarioPage() {
  return <CuestionarioContainer />;
}
