"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe, Shield, Users, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Catálogo", href: "/catalog" },
  { name: "Precios", href: "/pricing" },
  { name: "Mi Cuenta", href: "/account", requiresAuth: true },
];

const languages = [
  { code: "es", name: "Español", flag: "🇧🇴" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

interface NavigationProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

function Navigation({ currentLang, onLanguageChange }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm font-medium transition-colors hover:text-primary py-2 px-3 rounded-lg ${
            pathname === item.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          {item.name}
        </Link>
      ))}
      
      <div className="pt-4 mt-4 border-t">
        <h4 className="text-xs font-medium text-muted-foreground mb-2 px-3">IDIOMA</h4>
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-full text-left text-sm transition-colors py-2 px-3 rounded-lg flex items-center space-x-2 ${
                currentLang === lang.code
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("es");
  const pathname = usePathname();

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('legalcorp_language');
      if (savedLang && languages.some(lang => lang.code === savedLang)) {
        setCurrentLang(savedLang);
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('legalcorp_language', lang);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-default flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Legal Corp AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center space-x-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent border-none text-sm font-medium cursor-pointer appearance-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Registrarse</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold">Legal Corp AI</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>{currentLanguage?.flag}</span>
                  </div>
                </div>
                
                <Navigation 
                  currentLang={currentLang} 
                  onLanguageChange={handleLanguageChange} 
                />

                <div className="mt-auto pt-6 border-t">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Iniciar Sesión
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" asChild>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        Registrarse
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}