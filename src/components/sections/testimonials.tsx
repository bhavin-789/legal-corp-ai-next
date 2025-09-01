"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useIntl } from "react-intl";

const testimonials = [
  {
    name: "testimonial1.name",
    role: "testimonial1.role",
    company: "testimonial1.company",
    content: "testimonial1.content",
    avatar: "CM",
    rating: 5,
  },
  {
    name: "testimonial2.name",
    role: "testimonial2.role",
    company: "testimonial2.company",
    content: "testimonial2.content",
    avatar: "GR",
    rating: 5,
  },
  {
    name: "testimonial3.name",
    role: "testimonial3.role",
    company: "testimonial3.company",
    content: "testimonial3.content",
    avatar: "LF",
    rating: 4,
  },
  {
    name: "testimonial4.name",
    role: "testimonial4.role",
    company: "testimonial4.company",
    content: "testimonial4.content",
    avatar: "AV",
    rating: 5,
  },
];

export function Testimonials() {
  const intl = useIntl();
  return (
    <section className="py-16 md:py-24">
      <div className="container-default px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Quote className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {intl.formatMessage({
                id: "home.testimonials.title",
              })}
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            {intl.formatMessage({
              id: "home.testimonials.description",
            })}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="h-full border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 mb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "
                    {intl.formatMessage({
                      id: `home.testimonials.${testimonial.content}`,
                    })}
                    "
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`/avatars/${testimonial.avatar.toLowerCase()}.jpg`}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {intl.formatMessage({
                        id: `home.testimonials.${testimonial.name}`,
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {intl.formatMessage({
                        id: `home.testimonials.${testimonial.role}`,
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {intl.formatMessage({
                        id: `home.testimonials.${testimonial.company}`,
                      })}
                    </p>
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                {intl.formatMessage({
                  id: "home.testimonials.activeLawyers",
                })}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">
                {intl.formatMessage({
                  id: "home.testimonials.generatedDocuments",
                })}
                Documentos Generados
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                98%
              </div>
              <div className="text-sm text-muted-foreground">
                {intl.formatMessage({
                  id: "home.testimonials.satisfaction",
                })}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">
                {intl.formatMessage({
                  id: "home.testimonials.supportAvailable",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
