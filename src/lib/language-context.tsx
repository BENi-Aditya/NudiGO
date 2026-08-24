import { createContext, useContext, useState, ReactNode } from "react";

type Language = "kannada" | "kashmiri";

interface LanguageContextType {
  currentLanguage: Language;
  switchLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("kannada");

  const switchLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
