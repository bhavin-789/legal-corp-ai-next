import Link from "next/link";
import { FileText, Shield, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Producto: [
    { name: "Características", href: "/#features" },
    { name: "Catálogo de GPTs", href: "/catalog" },
    { name: "Precios", href: "/pricing" },
    { name: "Documentación", href: "/docs" },
  ],
  Empresa: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Carreras", href: "/careers" },
  ],
  Legal: [
    { name: "Términos de Servicio", href: "/terms" },
    { name: "Política de Privacidad", href: "/privacy" },
    { name: "Política de Cookies", href: "/cookies" },
    { name: "Aviso Legal", href: "/legal" },
  ],
  Soporte: [
    { name: "Centro de Ayuda", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "Soporte Técnico", href: "/support" },
    { name: "Estado del Sistema", href: "/status" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container-default px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Legal Corp AI</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Asistente legal impulsado por IA especializado en derecho boliviano. 
              Accede a 20 GPTs especializados y genera documentos legales con confianza.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Seguro y Confidencial</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contacto@legalcorpai.bo</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+591 2 1234567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>La Paz, Bolivia</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Legal Corp AI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}