"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useIntl } from "react-intl";

interface Feature {
  name: string;
  description: string;
  free: boolean;
  pro: boolean;
  firm: boolean;
}

const features: Feature[] = [
  {
    name: "GPTs Especializados",
    description: "Acceso a asistentes legales de IA",
    free: true,
    pro: true,
    firm: true,
  },
  {
    name: "Número de GPTs",
    description: "Asistentes disponibles",
    free: false,
    pro: false,
    firm: false,
  },
  {
    name: "Documentos por mes",
    description: "Límite de generación de documentos",
    free: false,
    pro: false,
    firm: false,
  },
  {
    name: "Chat Avanzado",
    description: "Conversaciones con historial completo",
    free: false,
    pro: true,
    firm: true,
  },
  {
    name: "Exportación de Documentos",
    description: "Descargar en PDF y DOCX",
    free: false,
    pro: true,
    firm: true,
  },
  {
    name: "Soporte Prioritario",
    description: "Respuesta en menos de 24 horas",
    free: false,
    pro: true,
    firm: true,
  },
  {
    name: "Usuarios Adicionales",
    description: "Acceso para múltiples usuarios",
    free: false,
    pro: false,
    firm: true,
  },
  {
    name: "API Access",
    description: "Integración con sistemas existentes",
    free: false,
    pro: false,
    firm: true,
  },
  {
    name: "Formación Personalizada",
    description: "Capacitación para tu equipo",
    free: false,
    pro: false,
    firm: true,
  },
  {
    name: "SLA Garantizado",
    description: "99.9% tiempo de actividad",
    free: false,
    pro: false,
    firm: true,
  },
];

const planDetails = {
  free: {
    name: "Gratis",
    gpts: "3 GPTs",
    documents: "10 documentos",
    color: "text-muted-foreground",
  },
  pro: {
    name: "Pro",
    gpts: "20 GPTs",
    documents: "100 documentos",
    color: "text-primary",
  },
  firm: {
    name: "Firm",
    gpts: "20 GPTs",
    documents: "Ilimitados",
    color: "text-primary",
  },
};

export function FeatureComparison() {
  const intl = useIntl();
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">
          {intl.formatMessage({
            id: "pricing.comparison.comparisonTable.title",
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium">
                  {intl.formatMessage({
                    id: "pricing.comparison.comparisonTable.featureTHead",
                  })}
                </th>
                <th className="text-center py-4 px-4 font-medium">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Gratis</span>
                    <span className="text-sm text-muted-foreground">
                      $0/mes
                    </span>
                  </div>
                </th>
                <th className="text-center py-4 px-4 font-medium">
                  <div className="flex flex-col items-center">
                    <Badge variant="secondary" className="mb-1">
                      Popular
                    </Badge>
                    <span className="font-medium">Pro</span>
                    <span className="text-sm text-muted-foreground">
                      $29/mes
                    </span>
                  </div>
                </th>
                <th className="text-center py-4 px-4 font-medium">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Firm</span>
                    <span className="text-sm text-muted-foreground">
                      $99/mes
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {feature.description}
                      </div>
                    </div>
                  </td>

                  {/* Special cases for numeric values */}
                  {feature.name === "Número de GPTs" ? (
                    <>
                      <td className="text-center py-4 px-4">
                        <span className="text-sm">{planDetails.free.gpts}</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-sm font-medium">
                          {planDetails.pro.gpts}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-sm font-medium">
                          {planDetails.firm.gpts}
                        </span>
                      </td>
                    </>
                  ) : feature.name === "Documentos por mes" ? (
                    <>
                      <td className="text-center py-4 px-4">
                        <span className="text-sm">
                          {planDetails.free.documents}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-sm font-medium">
                          {planDetails.pro.documents}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-sm font-medium">
                          {planDetails.firm.documents}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="text-center py-4 px-4">
                        {feature.free ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {feature.pro ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {feature.firm ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
