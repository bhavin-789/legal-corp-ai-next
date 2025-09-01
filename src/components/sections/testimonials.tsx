"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Carlos Mendoza",
    role: "Abogado Penalista",
    company: "Estudio Jurídico Mendoza & Asociados",
    content: "Legal Corp AI ha revolucionado mi práctica. Ahora puedo generar documentos y obtener asesoramiento legal en minutos, no en horas. La precisión en derecho boliviano es impresionante.",
    avatar: "CM",
    rating: 5
  },
  {
    name: "Lic. Gabriela Rojas",
    role: "Abogada Corporativa",
    company: "Legal Solutions SRL",
    content: "Como abogada corporativa, necesito rapidez y precisión. Esta plataforma me permite redactar contratos complejos con la confianza de que cumplen con la legislación boliviana actual.",
    avatar: "GR",
    rating: 5
  },
  {
    name: "Dr. Luis Fernández",
    role: "Profesor Universitario",
    company: "Universidad Mayor de San Andrés",
    content: "Uso Legal Corp AI para preparar mis clases y ayudar a mis estudiantes. Es una herramienta educativa invaluable que mantiene actualizado el conocimiento legal.",
    avatar: "LF",
    rating: 4
  },
  {
    name: "Lic. Ana Paula Vargas",
    role: "Abogada Laboral",
    company: "Consultoría Legal Laboral",
    content: "La especialización en derecho laboral boliviano es excelente. Me ha ahorrado incontables horas de investigación y me permite servir mejor a mis clientes.",
    avatar: "AV",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-default px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Quote className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Lo que Dicen Nuestros Usuarios
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Descubre cómo Legal Corp AI está transformando la práctica legal en Bolivia
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 mb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/avatars/${testimonial.avatar.toLowerCase()}.jpg`} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Abogados Activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Documentos Generados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Soporte Disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}