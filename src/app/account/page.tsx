"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProfileForm } from "@/components/account/profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  Settings,
  Activity,
  Smartphone,
  Mail,
} from "lucide-react";
import { authManager } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useIntl } from "react-intl";

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const { user, isAuthenticated } = authManager.getState();
  const intl = useIntl();

  const handleLogout = () => {
    authManager.logout();
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado tu sesión exitosamente.",
    });
    router.push("/");
  };

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Suscripción Cancelada",
      description:
        "Tu suscripción ha sido cancelada. Continuarás teniendo acceso hasta el final del período de facturación.",
    });
  };

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex-1 py-8">
      <div className="container-default px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {intl.formatMessage({ id: "account.mainTitle.title" })}
          </h1>
          <p className="text-muted-foreground">
            {intl.formatMessage({ id: "account.mainTitle.description" })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-8 w-8" />
                  </div>
                </div>
                <CardTitle className="text-lg">{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <Badge variant="outline" className="mt-2">
                  Plan{" "}
                  {user?.plan === "free"
                    ? "Gratis"
                    : user?.plan === "pro"
                    ? "Pro"
                    : "Firm"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  {intl.formatMessage({
                    id: "account.sidebar.buttons.profile",
                  })}
                </Button>
                <Button
                  variant={activeTab === "security" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {intl.formatMessage({
                    id: "account.sidebar.buttons.security",
                  })}
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  {intl.formatMessage({
                    id: "account.sidebar.buttons.notifications",
                  })}
                </Button>
                <Button
                  variant={activeTab === "billing" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("billing")}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {intl.formatMessage({
                    id: "account.sidebar.buttons.billing",
                  })}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {intl.formatMessage({ id: "account.sidebar.buttons.logOut" })}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="profile" className="space-y-6">
                <ProfileForm />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Seguridad de la Cuenta</span>
                    </CardTitle>
                    <CardDescription>
                      Gestiona la seguridad y el acceso a tu cuenta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Correo Electrónico</p>
                            <p className="text-sm text-muted-foreground">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Cambiar</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              Autenticación de Dos Factores
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Añade una capa extra de seguridad
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Configurar</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Settings className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Contraseña</p>
                            <p className="text-sm text-muted-foreground">
                              Último cambio: hace 30 días
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Cambiar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Actividad Reciente</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Inicio de sesión
                        </span>
                        <span>Hace 2 horas - La Paz, Bolivia</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Cambio de contraseña
                        </span>
                        <span>Hace 30 días</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Actualización de perfil
                        </span>
                        <span>Hace 5 días</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>
                        {intl.formatMessage({
                          id: "account.sidebar.notifications.title",
                        })}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      {intl.formatMessage({
                        id: "account.sidebar.notifications.description",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">
                          {intl.formatMessage({
                            id: "account.sidebar.notifications.emailNotifications.title",
                          })}
                        </h4>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div>
                              <p className="font-medium">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.emailNotifications.accountUpdates.title",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.emailNotifications.accountUpdates.description",
                                })}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded"
                            />
                          </label>
                          <label className="flex items-center justify-between cursor-pointer">
                            <div>
                              <p className="font-medium">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.emailNotifications.invoicesAndPayments.title",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.emailNotifications.invoicesAndPayments.description",
                                })}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded"
                            />
                          </label>
                          <label className="flex items-center justify-between cursor-pointer">
                            <div>
                              <p className="font-medium">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.emailNotifications.productUpdates.title",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.emailNotifications.productUpdates.description",
                                })}
                              </p>
                            </div>
                            <input type="checkbox" className="rounded" />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">
                          {intl.formatMessage({
                            id: "account.sidebar.notifications.pushNotifications.title",
                          })}
                        </h4>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div>
                              <p className="font-medium">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.pushNotifications.chatMessages.title",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.pushNotifications.chatMessages.description",
                                })}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded"
                            />
                          </label>
                          <label className="flex items-center justify-between cursor-pointer">
                            <div>
                              <p className="font-medium">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.pushNotifications.generatedDocuments.title",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({
                                  id: "account.sidebar.notifications.pushNotifications.generatedDocuments.description",
                                })}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>
                        {intl.formatMessage({
                          id: "account.sidebar.billing.title",
                        })}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {intl.formatMessage({
                              id: "account.sidebar.billing.planActual",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user?.plan === "free"
                              ? "Gratis"
                              : user?.plan === "pro"
                              ? "Pro - $29/mes"
                              : "Firm - $99/mes"}
                          </p>
                        </div>
                        <Button onClick={handleUpgrade}>
                          {intl.formatMessage({
                            id: "account.sidebar.billing.updatePlan",
                          })}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {intl.formatMessage({
                              id: "account.sidebar.billing.nextPayment",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            15 de abril de 2024
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleCancelSubscription}
                        >
                          {intl.formatMessage({
                            id: "account.sidebar.billing.unsubscribe",
                          })}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      {intl.formatMessage({
                        id: "account.sidebar.billing.paymentMethod",
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Visa -{" "}
                          {intl.formatMessage({
                            id: "account.sidebar.billing.expires",
                          })}{" "}
                          12/25
                        </p>
                      </div>
                      <Button variant="outline">
                        {intl.formatMessage({
                          id: "account.sidebar.billing.update",
                        })}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
