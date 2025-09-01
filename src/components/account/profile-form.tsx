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
import { useIntl } from "react-intl";

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
  const intl = useIntl();

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
            <span>
            {intl.formatMessage({ id: "account.sidebar.profile.personalInformation.title" })}
            </span>
          </CardTitle>
          <CardDescription>
            {intl.formatMessage({ id: "account.sidebar.profile.personalInformation.description" })}
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
          <CardTitle>
          {intl.formatMessage({ id: "account.sidebar.profile.basicInformation.title" })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
          {intl.formatMessage({ id: "account.sidebar.profile.basicInformation.fullName.label" })}

              </Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={intl.formatMessage({ id: "account.sidebar.profile.basicInformation.fullName.placeholder" })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
          {intl.formatMessage({ id: "account.sidebar.profile.basicInformation.email.label" })}

              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={intl.formatMessage({ id: "account.sidebar.profile.basicInformation.email.placeholder" })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
              {intl.formatMessage({ id: "account.sidebar.profile.basicInformation.telephone.label" })}
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={intl.formatMessage({ id: "account.sidebar.profile.basicInformation.telephone.placeholder" })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">
              {intl.formatMessage({ id: "account.sidebar.profile.basicInformation.language.label" })}
              </Label>
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
            <span>
            {intl.formatMessage({ id: "account.sidebar.profile.addressInformation.title" })}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">
            {intl.formatMessage({ id: "account.sidebar.profile.addressInformation.address.label" })}

            </Label>
            <Input
              id="address"
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder={intl.formatMessage({ id: "account.sidebar.profile.addressInformation.address.placeholder" })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
              {intl.formatMessage({ id: "account.sidebar.profile.addressInformation.city.label" })}
              </Label>
              <Input
                id="city"
                value={profileData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder={intl.formatMessage({ id: "account.sidebar.profile.addressInformation.city.placeholder" })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">
              {intl.formatMessage({ id: "account.sidebar.profile.addressInformation.country.label" })}
              </Label>
              <Input
                id="country"
                value={profileData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder={intl.formatMessage({ id: "account.sidebar.profile.addressInformation.country.placeholder" })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>
          {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.title" })}
          </CardTitle>
          <CardDescription>
          {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.description" })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">
          {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.emailNotification.title" })}

              </Label>
              <p className="text-sm text-muted-foreground">
          {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.emailNotification.description" })}
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
              <Label htmlFor="sms-notifications">
              {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.smsNotification.title" })}

              </Label>
              <p className="text-sm text-muted-foreground">
              {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.smsNotification.description" })}
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
              <Label htmlFor="marketing-emails">
              {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.marketingEmails.title" })}

              </Label>
              <p className="text-sm text-muted-foreground">
              {intl.formatMessage({ id: "account.sidebar.profile.notificationPreferences.marketingEmails.description" })}
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
            `${intl.formatMessage({ id: "account.sidebar.profile.saving" })}`
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {intl.formatMessage({ id: "account.sidebar.profile.saveChangesButton" })}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}