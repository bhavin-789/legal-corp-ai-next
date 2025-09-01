"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  FileText, 
  Shield, 
  Zap, 
  Users, 
  Globe,
  MessageSquare,
  Download,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "20 GPTs Especializados",
    description: "Accede a expertos en derecho civil, penal, laboral, tributario y más areas del derecho boliviano.",
    badge: "Popular"
  },
  {
    icon: FileText,
    title: "Generación de Documentos",
    description: "Crea contratos, demandas, escrituras y otros documentos legales con formato profesional.",
    badge: "Nuevo"
  },
  {
    icon: Shield,
    title: "Seguridad y Confidencialidad",
    description: "Tus conversaciones y documentos están protegidos con encriptación de grado empresarial.",
  },
  {
    icon: Zap,
    title: "Respuestas Rápidas",
    description: "Obtén respuestas legales precisas en segundos, no en horas o días.",
  },
  {
    icon: Users,
    title: "Diseñado para Profesionales",
    description: "Herramienta optimizada para abogados, estudiantes y profesionales del derecho.",
  },
  {
    icon: Globe,
    title: "Actualizado con Leyes Bolivianas",
    description: "Base de conocimiento actualizada con la legislación y jurisprudencia boliviana más reciente.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container-default px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Características Principales
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Todo lo que necesitas para llevar tu práctica legal al siguiente nivel
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
              {feature.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {feature.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Por qué elegir Legal Corp AI
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nuestra plataforma está diseñada específicamente para el mercado 
                  boliviano, con conocimiento local actualizado y herramientas que 
                  se adaptan a tus necesidades.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Base de conocimiento especializada en derecho boliviano</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Documentos en formato legal boliviano estándar</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Soporte en español y atención al cliente local</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Download className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}