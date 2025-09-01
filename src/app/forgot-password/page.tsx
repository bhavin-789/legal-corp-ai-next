"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";
import { authManager } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await authManager.forgotPassword(formData.email);
      
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Correo enviado",
          description: "Te hemos enviado un enlace para recuperar tu contraseña.",
        });
      } else {
        setError(result.error || "Error al enviar correo");
      }
    } catch (err) {
      setError("Error de conexión. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="w-full max-w-md">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">¡Correo Enviado!</h2>
              <p className="text-muted-foreground mb-6">
                Te hemos enviado un correo electrónico con instrucciones para recuperar tu contraseña.
                Por favor, revisa tu bandeja de entrada.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="text-primary hover:underline"
              >
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="w-full max-w-md">
          <AuthForm
            type="forgot"
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}