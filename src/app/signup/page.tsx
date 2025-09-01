"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";
import { authManager } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const { isAuthenticated } = authManager.getState();
    if (isAuthenticated) {
      router.push("/catalog");
    }
  }, [router]);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await authManager.signup(formData.email, formData.password, formData.name);
      
      if (result.success) {
        toast({
          title: "¡Cuenta creada exitosamente!",
          description: "Tu cuenta ha sido creada. Bienvenido a Legal Corp AI.",
        });
        
        // Reset form
        setError("");
        
        // Redirect to catalog
        setTimeout(() => {
          router.push("/catalog");
        }, 500);
      } else {
        setError(result.error || "Error al crear cuenta");
      }
    } catch (err) {
      setError("Error de conexión. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="w-full max-w-md">
          <AuthForm
            type="signup"
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
  );
}