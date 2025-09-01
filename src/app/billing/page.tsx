"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SubscriptionStatus } from "@/components/billing/subscription-status";
import { InvoiceList } from "@/components/billing/invoice-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download
} from "lucide-react";
import { authManager } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function BillingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { user, isAuthenticated } = authManager.getState();

  const handleUpgrade = () => {
    setShowUpgradeDialog(true);
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmUpgrade = () => {
    setShowUpgradeDialog(false);
    router.push("/pricing");
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    toast({
      title: "Suscripción Cancelada",
      description: "Tu suscripción ha sido cancelada. Continuarás teniendo acceso hasta el final del período de facturación.",
    });
  };

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Mock billing statistics
  const billingStats = {
    totalSpent: "$348.00",
    thisMonth: "$29.00",
    invoicesCount: 12,
    nextPayment: "15 de abril de 2024"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-default px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Facturación</h1>
            <p className="text-muted-foreground">
              Gestiona tu suscripción, pagos y facturas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CreditCard className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">Facturación</CardTitle>
                  <CardDescription>Gestiona tu plan y pagos</CardDescription>
                  <Badge variant="outline" className="mt-2">
                    Plan {user?.plan === 'free' ? 'Gratis' : user?.plan === 'pro' ? 'Pro' : 'Firm'}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={activeTab === "overview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Resumen
                  </Button>
                  <Button
                    variant={activeTab === "subscription" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("subscription")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Suscripción
                  </Button>
                  <Button
                    variant={activeTab === "invoices" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("invoices")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Facturas
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => router.push("/account")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configuración
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="overview" className="space-y-6">
                  {/* Billing Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Gastado</p>
                            <p className="text-2xl font-bold">{billingStats.totalSpent}</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Este Mes</p>
                            <p className="text-2xl font-bold">{billingStats.thisMonth}</p>
                          </div>
                          <CreditCard className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Facturas</p>
                            <p className="text-2xl font-bold">{billingStats.invoicesCount}</p>
                          </div>
                          <FileText className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Próximo Pago</p>
                            <p className="text-sm font-bold">{billingStats.nextPayment.split(' ')[0]}</p>
                          </div>
                          <Clock className="h-8 w-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">Pago Exitoso</p>
                              <p className="text-sm text-muted-foreground">Factura INV-2024-002 - $29.00</p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">15 feb 2024</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Settings className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Plan Actualizado</p>
                              <p className="text-sm text-muted-foreground">Gratis → Pro</p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">15 ene 2024</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <div>
                              <p className="font-medium">Método de Pago Actualizado</p>
                              <p className="text-sm text-muted-foreground">•••• 4242</p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">10 ene 2024</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Acciones Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button onClick={handleUpgrade} className="h-auto p-4 flex-col">
                          <TrendingUp className="h-6 w-6 mb-2" />
                          <span>Actualizar Plan</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex-col">
                          <Download className="h-6 w-6 mb-2" />
                          <span>Descargar Facturas</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="subscription" className="space-y-6">
                  <SubscriptionStatus onUpgrade={handleUpgrade} onCancel={handleCancel} />
                </TabsContent>

                <TabsContent value="invoices" className="space-y-6">
                  <InvoiceList />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>¿Estás seguro que quieres actualizar tu plan? Serás redirigido a la página de precios para seleccionar un nuevo plan.</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmUpgrade}>
                Ver Planes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Suscripción</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>¿Estás seguro que quieres cancelar tu suscripción?</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  Tu acceso continuará hasta el final del período de facturación actual.
                </span>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Mantener Suscripción
              </Button>
              <Button variant="destructive" onClick={confirmCancel}>
                Cancelar Suscripción
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
}