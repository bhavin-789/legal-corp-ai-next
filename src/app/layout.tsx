import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legal Corp AI - Asistente Legal con IA para Bolivia",
  description: "Accede a 20 GPTs especializados en derecho boliviano. Chatea con expertos legales y genera documentos profesionales con IA.",
  keywords: ["Legal Corp AI", "IA legal", "derecho boliviano", "abogados", "documentos legales", "Bolivia"],
  authors: [{ name: "Legal Corp AI Team" }],
  openGraph: {
    title: "Legal Corp AI - Asistente Legal con IA para Bolivia",
    description: "Plataforma de IA especializada en derecho boliviano con 20 GPTs expertos",
    url: "https://legalcorpai.bo",
    siteName: "Legal Corp AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Corp AI - Asistente Legal con IA para Bolivia",
    description: "Plataforma de IA especializada en derecho boliviano",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
