"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
  highlighted?: boolean;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  popular = false,
  highlighted = false
}: PricingCardProps) {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 ${
      highlighted 
        ? 'ring-2 ring-primary shadow-lg scale-105' 
        : popular 
          ? 'ring-2 ring-primary shadow-lg' 
          : 'border-border/50 hover:shadow-lg'
    }`}>
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
          Más Popular
        </div>
      )}
      
      {highlighted && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center py-2 text-sm font-medium">
          Recomendado
        </div>
      )}
      
      <CardHeader className={`pb-8 ${popular || highlighted ? 'pt-12' : 'pt-6'}`}>
        <div className="text-center">
          <CardTitle className="text-2xl mb-2">{name}</CardTitle>
          <CardDescription className="mb-4">{description}</CardDescription>
          <div className="flex items-baseline justify-center space-x-1">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-muted-foreground">/{period}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full" 
          variant={highlighted || popular ? "default" : "outline"}
          size="lg"
          asChild
        >
          <Link href={ctaLink}>
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}