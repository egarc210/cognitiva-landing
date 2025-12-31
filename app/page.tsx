import React from 'react';
import { BookOpen, Sparkles, Target, Check, Star } from 'lucide-react';

export default function CognitivaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Cognitiva</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
            Empezar Gratis
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">Aprendizaje personalizado con IA</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Ejercicios que se adaptan a tu hijo
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Material educativo basado en los libros de la SEP, personalizado según el estilo de aprendizaje e intereses de cada estudiante de primaria
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition shadow-lg">
            Prueba 7 días gratis
          </button>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition">
            Ver cómo funciona
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"></div>
            ))}
          </div>
          <span>Más de 500 familias confían en Cognitiva</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir Cognitiva?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="100% Personalizado"
              description="Cada ejercicio se adapta al perfil de aprendizaje de tu hijo: visual, verbal o kinestésico"
              color="blue"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="IA Inteligente"
              description="Retroalimentación inmediata y motivadora generada por Claude AI, adaptada a cada respuesta"
              color="purple"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Basado en la SEP"
              description="Contenido alineado 100% con los libros de texto gratuitos de la Secretaría de Educación Pública"
              color="green"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Cómo funciona en 3 pasos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Registro rápido"
            description="Crea una cuenta y agrega a tu hijo. Solo toma 2 minutos."
          />
          <StepCard
            number="2"
            title="Perfil de aprendizaje"
            description="Tu hijo completa un cuestionario divertido de 10 preguntas para identificar su estilo."
          />
          <StepCard
            number="3"
            title="¡A aprender!"
            description="Recibe ejercicios personalizados con retroalimentación inteligente en tiempo real."
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Resultados que los padres aman
              </h2>
              <ul className="space-y-4">
                <BenefitItem text="Mejora promedio de 25% en calificaciones" />
                <BenefitItem text="Mayor motivación y confianza en sí mismos" />
                <BenefitItem text="Dashboard para que sigas el progreso en tiempo real" />
                <BenefitItem text="Ejercicios ilimitados adaptados a sus intereses" />
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5</span>
              </div>
              <p className="text-lg italic mb-4">
                "Mi hija pasó de tener problemas con matemáticas a pedir hacer más ejercicios. ¡Increíble!"
              </p>
              <p className="font-semibold">— María González, madre de familia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Planes accesibles para todos
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Cancela cuando quieras. Primera semana gratis.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            name="Mensual"
            price="$199"
            period="mes"
            features={[
              "1 estudiante",
              "Ejercicios ilimitados",
              "Dashboard de progreso",
              "Soporte por email"
            ]}
          />
          <PricingCard
            name="Trimestral"
            price="$499"
            period="3 meses"
            features={[
              "1 estudiante",
              "Ejercicios ilimitados",
              "Dashboard avanzado",
              "Soporte prioritario",
              "Ahorra 17%"
            ]}
            highlighted={true}
          />
          <PricingCard
            name="Anual"
            price="$1,599"
            period="año"
            features={[
              "Hasta 3 estudiantes",
              "Ejercicios ilimitados",
              "Reportes mensuales",
              "Soporte prioritario",
              "Ahorra 33%"
            ]}
          />
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empieza hoy, sin riesgo
          </h2>
          <p className="text-xl mb-8">
            7 días de prueba gratis. No se requiere tarjeta de crédito.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition shadow-xl">
            Crear cuenta gratis
          </button>
          <p className="text-sm mt-4 text-blue-100">
            ✓ Cancela cuando quieras  ✓ Sin compromisos  ✓ Soporte en español
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">Cognitiva</span>
          </div>
          <p className="text-sm">
            © 2025 Cognitiva. Aprendizaje personalizado para primaria.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: 'blue' | 'purple' | 'green';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600'
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
      <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-6 h-6 flex-shrink-0 mt-0.5" />
      <span className="text-lg">{text}</span>
    </li>
  );
}

function PricingCard({ name, price, period, features, highlighted }: {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-8 ${highlighted ? 'bg-blue-600 text-white shadow-2xl scale-105' : 'bg-white shadow-lg'}`}>
      {highlighted && (
        <div className="bg-yellow-400 text-blue-900 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
          MÁS POPULAR
        </div>
      )}
      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className={`text-lg ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
          /{period}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className={`w-5 h-5 ${highlighted ? 'text-yellow-400' : 'text-blue-600'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-full font-semibold transition ${
        highlighted 
          ? 'bg-white text-blue-600 hover:bg-gray-100' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        Seleccionar plan
      </button>
    </div>
  );
}