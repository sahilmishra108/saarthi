"use client";

import { useState, useEffect } from "react";
import { getTranslation, getTranslations } from "@/lib/translations";
import { defaultLanguage } from "@/lib/i18n";

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load saved language preference only after mounting
    const savedLang = localStorage.getItem("saarthi-language");
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  const t = (key) => getTranslation(currentLanguage, key);
  const translations = getTranslations(currentLanguage);

  return {
    t,
    translations,
    currentLanguage,
    setLanguage: (lang) => {
      setCurrentLanguage(lang);
      if (isMounted) {
        localStorage.setItem("saarthi-language", lang);
        window.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }));
      }
    }
  };
} 