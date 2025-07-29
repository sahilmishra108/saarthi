export const languages = {
  en: {
    name: "English",
    flag: "🇺🇸",
    dir: "ltr"
  },
  hi: {
    name: "हिंदी",
    flag: "🇮🇳", 
    dir: "ltr"
  },
  es: {
    name: "Español",
    flag: "🇪🇸",
    dir: "ltr"
  },
  fr: {
    name: "Français", 
    flag: "🇫🇷",
    dir: "ltr"
  },
  de: {
    name: "Deutsch",
    flag: "🇩🇪",
    dir: "ltr"
  },
  zh: {
    name: "中文",
    flag: "🇨🇳",
    dir: "ltr"
  },
  ar: {
    name: "العربية",
    flag: "🇸🇦",
    dir: "rtl"
  }
};

export const defaultLanguage = "en";

export function getLanguageDirection(lang) {
  return languages[lang]?.dir || "ltr";
} 