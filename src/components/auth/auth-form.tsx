"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "signup" | "forgot";
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

export function AuthForm({ type, onSubmit, isLoading = false, error }: AuthFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Validate form in real-time
  useEffect(() => {
    const errors: ValidationErrors = {};
    
    // Email validation
    if (touched.email && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Formato de correo inválido";
      }
    }
    
    // Password validation
    if (touched.password && formData.password) {
      if (formData.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
      } else if (!/[A-Z]/.test(formData.password)) {
        errors.password = "Debe contener al menos una mayúscula";
      } else if (!/[a-z]/.test(formData.password)) {
        errors.password = "Debe contener al menos una minúscula";
      } else if (!/\d/.test(formData.password)) {
        errors.password = "Debe contener al menos un número";
      }
    }
    
    // Confirm password validation
    if (touched.confirmPassword && formData.confirmPassword && formData.password) {
      if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = "Las contraseñas no coinciden";
      }
    }
    
    // Name validation
    if (touched.name && formData.name) {
      if (formData.name.trim().length < 2) {
        errors.name = "El nombre debe tener al menos 2 caracteres";
      }
    }
    
    setValidationErrors(errors);
  }, [formData, touched]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as {[key: string]: boolean});
    setTouched(allTouched);
    
    // Check if there are validation errors
    const hasErrors = Object.values(validationErrors).some(error => error !== undefined);
    if (hasErrors) {
      return;
    }
    
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getFieldError = (field: keyof ValidationErrors) => {
    return validationErrors[field];
  };

  const isFieldValid = (field: keyof ValidationErrors) => {
    return touched[field] && formData[field as keyof FormData] && !validationErrors[field];
  };

  const getTitle = () => {
    switch (type) {
      case "login": return "Iniciar Sesión";
      case "signup": return "Crear Cuenta";
      case "forgot": return "Recuperar Contraseña";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "login": return "Ingresa tus credenciales para acceder a tu cuenta";
      case "signup": return "Crea tu cuenta para comenzar a usar Legal Corp AI";
      case "forgot": return "Te enviaremos un enlace para recuperar tu contraseña";
    }
  };

  const getPasswordRequirements = () => {
    return (
      <div className="text-xs text-muted-foreground space-y-1">
        <p>La contraseña debe contener:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Mínimo 8 caracteres</li>
          <li>Al menos una mayúscula</li>
          <li>Al menos una minúscula</li>
          <li>Al menos un número</li>
        </ul>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl">{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  required
                  className={getFieldError("name") ? "border-red-500" : isFieldValid("name") ? "border-green-500" : ""}
                />
                {isFieldValid("name") && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                )}
              </div>
              {getFieldError("name") && (
                <p className="text-xs text-red-500">{getFieldError("name")}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                required
                className={getFieldError("email") ? "border-red-500" : isFieldValid("email") ? "border-green-500" : ""}
              />
              {isFieldValid("email") && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
            </div>
            {getFieldError("email") && (
              <p className="text-xs text-red-500">{getFieldError("email")}</p>
            )}
          </div>

          {type !== "forgot" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    required
                    className={getFieldError("password") ? "border-red-500" : isFieldValid("password") ? "border-green-500" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {getFieldError("password") && (
                  <p className="text-xs text-red-500">{getFieldError("password")}</p>
                )}
                {type === "signup" && touched.password && !getFieldError("password") && (
                  <div className="mt-2">
                    {getPasswordRequirements()}
                  </div>
                )}
              </div>

              {type === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      required
                      className={getFieldError("confirmPassword") ? "border-red-500" : isFieldValid("confirmPassword") ? "border-green-500" : "pr-10"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {getFieldError("confirmPassword") && (
                    <p className="text-xs text-red-500">{getFieldError("confirmPassword")}</p>
                  )}
                </div>
              )}
            </>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || Object.values(validationErrors).some(error => error !== undefined)}
          >
            {isLoading ? "Procesando..." : getTitle()}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          {type === "login" && (
            <>
              <p className="text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Regístrate
                </Link>
              </p>
              <p className="mt-2 text-muted-foreground">
                ¿Olvidaste tu contraseña?{" "}
                <Link href="/forgot-password" className="text-primary hover:underline font-medium">
                  Recupérala
                </Link>
              </p>
            </>
          )}
          
          {type === "signup" && (
            <p className="text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Inicia sesión
              </Link>
            </p>
          )}
          
          {type === "forgot" && (
            <p className="text-muted-foreground">
              ¿Recordaste tu contraseña?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Inicia sesión
              </Link>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}