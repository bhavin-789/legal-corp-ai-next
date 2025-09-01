"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Star, 
  Zap, 
  Calendar, 
  CreditCard, 
  TrendingUp,
  Users,
  FileText,
  AlertCircle
} from "lucide-react";
import { authManager } from "@/lib/auth";

interface SubscriptionStatusProps {
  onUpgrade: () => void;
  onCancel: () => void;
}

export function SubscriptionStatus({ onUpgrade, onCancel }: SubscriptionStatusProps) {
  const user = authManager.getState().user;
  
  const plans = {
    free: {
      name: "Gratis",
      icon: Zap,
      color: "bg-gray-100 text-gray-800",
      price: "$0/mes",
      features: ["3 GPTs", "10 documentos/mes", "Soporte básico"]
    },
    pro: {
      name: "Pro",
      icon: Star,
      color: "bg-blue-100 text-blue-800",
      price: "$29/mes",
      features: ["20 GPTs", "100 documentos/mes", "Soporte prioritario", "Exportación PDF/DOCX"]
    },
    firm: {
      name: "Firm",
      icon: Crown,
      color: "bg-purple-100 text-purple-800",
      price: "$99/mes",
      features: ["Todo en Pro", "Documentos ilimitados", "5 usuarios", "API access", "Soporte dedicado"]
    }
  };

  const currentPlan = plans[user?.plan || 'free'];
  const Icon = currentPlan.icon;

  // Mock usage data
  const usageData = {
    documents: { used: 65, limit: user?.plan === 'free' ? 10 : user?.plan === 'pro' ? 100 : Infinity },
    gpts: { used: 8, limit: user?.plan === 'free' ? 3 : 20 },
    storage: { used: 2.3, limit: user?.plan === 'free' ? 5 : user?.plan === 'pro' ? 50 : 500 }
  };

  const getNextBillingDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('es-BO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5" />
              <span>Plan Actual</span>
            </div>
            <Badge className={currentPlan.color}>
              {currentPlan.name}
            </Badge>
          </CardTitle>
          <CardDescription>
            Estás suscrito al plan {currentPlan.name} por {currentPlan.price}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Próximo cobro: {getNextBillingDate()}</span>
            </div>
            <div className="flex space-x-2">
              {user?.plan !== 'firm' && (
                <Button variant="outline" onClick={onUpgrade}>
                  Actualizar Plan
                </Button>
              )}
              {user?.plan !== 'free' && (
                <Button variant="outline" onClick={onCancel}>
                  Cancelar Suscripción
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Uso del Plan</span>
          </CardTitle>
          <CardDescription>
            Monitorea el uso de tu suscripción actual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Documents Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Documentos Generados</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {usageData.documents.used} de {usageData.documents.limit === Infinity ? '∞' : usageData.documents.limit}
              </span>
            </div>
            {usageData.documents.limit !== Infinity && (
              <Progress 
                value={(usageData.documents.used / usageData.documents.limit) * 100} 
                className="h-2"
              />
            )}
          </div>

          {/* GPTs Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">GPTs Accesibles</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {usageData.gpts.used} de {usageData.gpts.limit}
              </span>
            </div>
            <Progress 
              value={(usageData.gpts.used / usageData.gpts.limit) * 100} 
              className="h-2"
            />
          </div>

          {/* Storage Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm font-medium">Almacenamiento</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {usageData.storage.used} GB de {usageData.storage.limit} GB
              </span>
            </div>
            <Progress 
              value={(usageData.storage.used / usageData.storage.limit) * 100} 
              className="h-2"
            />
          </div>

          {/* Usage Warning */}
          {usageData.documents.used / usageData.documents.limit > 0.8 && usageData.documents.limit !== Infinity && (
            <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Estás cerca de alcanzar tu límite de documentos. Considera actualizar tu plan.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Método de Pago</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Visa - Expira 12/25</p>
            </div>
            <Button variant="outline" size="sm">
              Actualizar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}