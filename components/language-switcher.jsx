"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { languages, defaultLanguage } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load saved language preference only after mounting
    const savedLang = localStorage.getItem("saarthi-language");
    if (savedLang && languages[savedLang]) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    if (isMounted) {
      localStorage.setItem("saarthi-language", lang);
      
      // Update document direction for RTL languages
      const direction = languages[lang]?.dir || "ltr";
      document.documentElement.dir = direction;
      document.documentElement.lang = lang;
      
      // Trigger a custom event for other components to listen to
      window.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }));
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <span className="hidden md:block">{languages[defaultLanguage]?.flag}</span>
        <span className="hidden lg:block">{languages[defaultLanguage]?.name}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:block">{languages[currentLanguage]?.flag}</span>
          <span className="hidden lg:block">{languages[currentLanguage]?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
            {currentLanguage === code && (
              <Check className="h-4 w-4 text-[--accent]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 