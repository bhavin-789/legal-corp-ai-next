"use client";

import Link from "next/link";
import { FileText, Shield, Mail, Phone, MapPin } from "lucide-react";
import { useIntl } from "react-intl";

const footerLinks = {
  "product.title": [
    { name: "product.features", href: "/#features" },
    { name: "product.GPTCatalog", href: "/catalog" },
    { name: "product.prices", href: "/pricing" },
    { name: "product.documentation", href: "/docs" },
  ],
  "enterprise.title": [
    { name: "enterprise.aboutUs", href: "/about" },
    { name: "enterprise.contact", href: "/contact" },
    { name: "enterprise.blog", href: "/blog" },
    { name: "enterprise.racing", href: "/careers" },
  ],
  "legal.title": [
    { name: "legal.termsOfService", href: "/terms" },
    { name: "legal.privacyPolicy", href: "/privacy" },
    { name: "legal.cookiePolicy", href: "/cookies" },
    { name: "legal.legalNotice", href: "/legal" },
  ],
  "medium.title": [
    { name: "medium.helpCenter", href: "/help" },
    { name: "medium.FAQ", href: "/faq" },
    { name: "medium.technicalSupport", href: "/support" },
    { name: "medium.systemStatus", href: "/status" },
  ],
};

export function Footer() {
  const intl = useIntl();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container-default px-4">
        <div className="py-[96px]">
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
                {intl.formatMessage({
                  id: "footer.description",
                })}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>
                    {intl.formatMessage({
                      id: "footer.safeAndConfidential",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-4">
                  {" "}
                  {intl.formatMessage({
                    id: `footer.${category}`,
                  })}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {intl.formatMessage({
                          id: `footer.${link.name}`,
                        })}
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
            <p>
              &copy; 2025 Legal Corp AI. {intl.formatMessage({
                id: "footer.allRightsReserved",
              })}
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
