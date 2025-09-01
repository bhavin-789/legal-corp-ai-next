"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useIntl } from "react-intl";

const plans = [
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
    ],
    cta: "Comenzar Gratis",
    ctaLink: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    period: "mes",
    description: "Para profesionales independientes",
    features: [
      "Todos los 20 GPTs",
      "100 documentos por mes",
      "Chat avanzado",
      "Exportación en PDF/DOCX",
      "Prioridad en soporte",
    ],
    cta: "Suscribirse",
    ctaLink: "/signup",
    popular: true,
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
      "Soporte dedicado",
      "Formación personalizada",
    ],
    cta: "Contactar Ventas",
    ctaLink: "/contact",
    popular: false,
  },
];

export function PricingTeaser() {
  const intl = useIntl();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container-default px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {intl.formatMessage({ id: "home.pricing.title" })}
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            {intl.formatMessage({ id: "home.pricing.description" })}
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/pricing">
              {intl.formatMessage({ id: "home.pricing.seeAllPlans" })}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular
                  ? "ring-2 ring-primary shadow-lg"
                  : "border-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  Más Popular
                </div>
              )}

              <CardHeader className={`pb-8 ${plan.popular ? "pt-12" : "pt-6"}`}>
                <div className="text-center">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href={plan.ctaLink}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            {intl.formatMessage({ id: "home.pricing.doUNeedCustmizedPlan" })}
          </p>
          <Button variant="link" asChild>
            <Link href="/contact">
              {intl.formatMessage({ id: "home.pricing.contactSalesButton" })}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
