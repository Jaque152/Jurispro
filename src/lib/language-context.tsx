"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dictionaries, Language, Dictionary } from "./dictionaries";

type LanguageContextType = {
  lang: Language;
  t: Dictionary;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("lc.lang") as Language;
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lc.lang", newLang);
  };

  // Envolvemos siempre para evitar errores de hidratación, 
  // suministrando el español por defecto durante el renderizado del servidor.
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: "es", t: dictionaries.es, setLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}