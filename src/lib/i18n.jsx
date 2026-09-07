import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    nav: {
      home: "Home", spoilers: "Pre-Made Spoilers", mirrors: "Mirror Caps", custom: "Custom Parts",
      technology: "Technology", portfolio: "Portfolio", about: "About", quote: "Request a Quote", contact: "Contact",
    },
    footer: {
      description: "Precision carbon-fiber manufacturing for automotive, motorcycle, drone, industrial, and fully custom applications.",
      navigate: "Navigate", contact: "Contact", hours: "Hours", privacy: "Privacy Policy", terms: "Terms & Conditions",
    },
    language: "العربية",
  },
  ar: {
    nav: {
      home: "الرئيسية", spoilers: "أجنحة جاهزة", mirrors: "أغطية المرايا", custom: "قطع مخصصة",
      technology: "التقنية", portfolio: "أعمالنا", about: "من نحن", quote: "طلب عرض سعر", contact: "اتصل بنا",
    },
    footer: {
      description: "تصنيع دقيق لأجزاء ألياف الكربون للسيارات والدراجات والطائرات المسيرة والتطبيقات الصناعية والمخصصة بالكامل.",
      navigate: "التنقل", contact: "تواصل معنا", hours: "ساعات العمل", privacy: "سياسة الخصوصية", terms: "الشروط والأحكام",
    },
    language: "English",
  },
};

function detectLanguage() {
  const locales = [...(navigator.languages || []), navigator.language || "en"];
  return locales.some((locale) => locale.toLowerCase().startsWith("ar")) ? "ar" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectLanguage);
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function formatSAR(value, language = "en") {
  return new Intl.NumberFormat(language === "ar" ? "ar-SA" : "en-SA", {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}
