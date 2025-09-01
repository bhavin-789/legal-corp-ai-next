"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Globe, Save, Camera } from "lucide-react";
import { authManager } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  language: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export function ProfileForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: authManager.getState().user?.name || "",
    email: authManager.getState().user?.email || "",
    phone: "+591 70000000",
    address: "Av. Principal #123",
    city: "La Paz",
    country: "Bolivia",
    language: "es",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false
  });

  const handleInputChange = (field: keyof ProfileData, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user in auth manager
    authManager.updateUser({ name: profileData.name });
    
    toast({
      title: "Perfil Actualizado",
      description: "Tu información de perfil ha sido guardada exitosamente.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Información Personal</span>
          </CardTitle>
          <CardDescription>
            Actualiza tu información personal y preferencias de cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/avatars/user.jpg" />
                <AvatarFallback className="text-lg">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{profileData.name}</h3>
              <p className="text-sm text-muted-foreground">{profileData.email}</p>
              <Badge variant="outline" className="mt-1">
                {authManager.getState().user?.plan === 'free' ? 'Gratis' : 
                 authManager.getState().user?.plan === 'pro' ? 'Pro' : 'Firm'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Juan Pérez"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+591 70000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={profileData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Información de Dirección</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Av. Principal #123"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                value={profileData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="La Paz"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                value={profileData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Bolivia"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Notificación</CardTitle>
          <CardDescription>
            Configura cómo quieres recibir notificaciones de nuestra plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">
                Recibe notificaciones importantes sobre tu cuenta
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={profileData.emailNotifications}
              onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
              <p className="text-sm text-muted-foreground">
                Recibe alertas importantes por mensaje de texto
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={profileData.smsNotifications}
              onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Emails de Marketing</Label>
              <p className="text-sm text-muted-foreground">
                Recibe actualizaciones sobre nuevos features y promociones
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={profileData.marketingEmails}
              onCheckedChange={(checked) => handleInputChange('marketingEmails', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="px-8"
        >
          {isLoading ? (
            "Guardando..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
    </div>
  );
}