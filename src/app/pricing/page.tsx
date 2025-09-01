"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingCard } from "@/components/pricing/pricing-card";
import { PricingToggle } from "@/components/pricing/pricing-toggle";
import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import Link from "next/link";

const pricingPlans = {
  monthly: [
    {
      name: "Gratis",
      price: "0",
      period: "mes",
      description: "Perfecto para comenzar y explorar",
      features: [
        "3 GPTs especializados",
        "10 documentos por mes",
        "Chat básico",
        "Soporte por email",
        "Acceso a documentación"
      ],
      cta: "Comenzar Gratis",
      ctaLink: "/signup",
      popular: false
    },
    {
      name: "Pro",
      price: "29",
      period: "mes",
      description: "Para profesionales independientes",
      features: [
        "Todos los 20 GPTs",
        "100 documentos por mes",
        "Chat avanzado con historial",
        "Exportación en PDF/DOCX",
        "Prioridad en soporte",
        "Actualizaciones automáticas"
      ],
      cta: "Suscribirse",
      ctaLink: "/signup",
      popular: true
    },
    {
      name: "Firm",
      price: "99",
      period: "mes",
      description: "Para estudios jurídicos",
      features: [
        "Todo en Pro",
        "Documentos ilimitados",
        "Multiusuario (5 usuarios)",
        "Integración API",
        "Soporte dedicado 24/7",
        "Formación personalizada",
        "SLA garantizado",
        "Cuenta Manager dedicado"
      ],
      cta: "Contactar Ventas",
      ctaLink: "/contact",
      popular: false
    }
  ],
  yearly: [
    {
      name: "Gratis",
      price: "0",
      period: "año",
      description: "Perfecto para comenzar y explorar",
      features: [
        "3 GPTs especializados",
        "10 documentos por mes",
        "Chat básico",
        "Soporte por email",
        "Acceso a documentación"
      ],
      cta: "Comenzar Gratis",
      ctaLink: "/signup",
      popular: false
    },
    {
      name: "Pro",
      price: "278",
      period: "año",
      description: "Para profesionales independientes",
      features: [
        "Todos los 20 GPTs",
        "100 documentos por mes",
        "Chat avanzado con historial",
        "Exportación en PDF/DOCX",
        "Prioridad en soporte",
        "Actualizaciones automáticas",
        "Ahorro de $70/año"
      ],
      cta: "Suscribirse",
      ctaLink: "/signup",
      popular: true
    },
    {
      name: "Firm",
      price: "950",
      period: "año",
      description: "Para estudios jurídicos",
      features: [
        "Todo en Pro",
        "Documentos ilimitados",
        "Multiusuario (5 usuarios)",
        "Integración API",
        "Soporte dedicado 24/7",
        "Formación personalizada",
        "SLA garantizado",
        "Cuenta Manager dedicado",
        "Ahorro de $238/año"
      ],
      cta: "Contactar Ventas",
      ctaLink: "/contact",
      popular: false
    }
  ]
};

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const currentPlans = isYearly ? pricingPlans.yearly : pricingPlans.monthly;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container-default px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Planes para Cada Necesidad Legal
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Elige el plan perfecto para tu práctica legal. Desde abogados independientes 
                hasta estudios jurídicos completos.
              </p>
              
              <div className="flex justify-center mb-8">
                <PricingToggle onToggle={setIsYearly} />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 -mt-8">
          <div className="container-default px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {currentPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  name={plan.name}
                  price={plan.price}
                  period={plan.period}
                  description={plan.description}
                  features={plan.features}
                  cta={plan.cta}
                  ctaLink={plan.ctaLink}
                  popular={plan.popular}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 bg-muted/30">
          <div className="container-default px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Comparación Detallada
                </h2>
                <p className="text-xl text-muted-foreground">
                  Encuentra el plan perfecto comparando todas las características
                </p>
              </div>
              
              <FeatureComparison />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container-default px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Preguntas Frecuentes
                </h2>
                <p className="text-xl text-muted-foreground">
                  Todo lo que necesitas saber sobre nuestros planes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="font-semibold mb-2">¿Puedo cambiar de plan más tarde?</h3>
                    <p className="text-muted-foreground">
                      Sí, puedes actualizar o bajar tu plan en cualquier momento. 
                      Los cambios se aplican inmediatamente.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="font-semibold mb-2">¿Hay contrato de permanencia?</h3>
                    <p className="text-muted-foreground">
                      No, todos nuestros planes son mensuales y puedes cancelar 
                      cuando quieras sin penalidades.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="font-semibold mb-2">¿Qué métodos de pago aceptan?</h3>
                    <p className="text-muted-foreground">
                      Aceptamos tarjetas de crédito, débito y transferencias bancarias. 
                      Para planes empresariales, también ofrecemos facturación.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="font-semibold mb-2">¿Mis datos están seguros?</h3>
                    <p className="text-muted-foreground">
                      Sí, utilizamos encriptación de grado empresarial y cumplimos 
                      con las regulaciones de protección de datos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container-default px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para Transformar tu Práctica Legal?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Únete a cientos de abogados en Bolivia que ya están usando Legal Corp AI 
                para mejorar su productividad y servir mejor a sus clientes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Comenzar Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">
                    Contactar Ventas
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}