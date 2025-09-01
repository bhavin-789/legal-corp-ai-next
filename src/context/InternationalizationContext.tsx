"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IntlProvider } from "react-intl";
import { flattenMessages } from "@/lib/utils";
import en from "@/common/lang/en";
import es from "@/common/lang/es";

type InternationalizationContextType = {
  locale: string;
  setLocale: Dispatch<SetStateAction<"en" | "es">>;
};

const InternationalizationContext = createContext<
  InternationalizationContextType | undefined
>(undefined);

export const useInternationalization = () => {
  const context = useContext(InternationalizationContext);
  if (context === undefined) {
    throw new Error(
      "useInternationalization must be used within an InternationalizationProvider"
    );
  }
  return context;
};

export const InternationalizationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [locale, setLocale] = useState<"en" | "es">("es");

  const messages = {
    en: flattenMessages(en),
    es: flattenMessages(es),
  };

  useEffect(() => {
    let storedLocale: "en" | "es" | undefined;
    if (typeof window !== 'undefined') {
      storedLocale = localStorage.getItem("legalcorp_language") as
        | "en"
        | "es"
        ;
      if (storedLocale) {
        setLocale(storedLocale);
      } else {
        setLocale("es");
        localStorage.setItem("legalcorp_language", "es");
      }
    }
  }, []);

  const value: InternationalizationContextType = {
    locale,
    setLocale,
  };
  return (
    <InternationalizationContext value={value}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </InternationalizationContext>
  );
};
