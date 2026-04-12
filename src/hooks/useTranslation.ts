import { useState, useEffect } from "react";

export interface BibleTranslation {
  id: string;
  name: string;
  language: string;
  languageFlag: string;
}

export const TRANSLATIONS: BibleTranslation[] = [
  { id: "web", name: "World English Bible", language: "English", languageFlag: "🇺🇸" },
  { id: "kjv", name: "King James Version", language: "English", languageFlag: "🇬🇧" },
  { id: "asv", name: "American Standard Version", language: "English", languageFlag: "🇺🇸" },
  { id: "bbe", name: "Bible in Basic English", language: "English", languageFlag: "🇬🇧" },
  { id: "darby", name: "Darby Bible", language: "English", languageFlag: "🇬🇧" },
  { id: "dra", name: "Douay-Rheims", language: "English", languageFlag: "🇺🇸" },
  { id: "ylt", name: "Young's Literal Translation", language: "English", languageFlag: "🇬🇧" },
  { id: "oeb-us", name: "Open English Bible (US)", language: "English", languageFlag: "🇺🇸" },
  { id: "almeida", name: "João Ferreira de Almeida", language: "Português", languageFlag: "🇧🇷" },
  { id: "cuv", name: "Chinese Union Version", language: "中文", languageFlag: "🇨🇳" },
  { id: "bkr", name: "Bible Kralická", language: "Čeština", languageFlag: "🇨🇿" },
  { id: "rccv", name: "Cornilescu Version", language: "Română", languageFlag: "🇷🇴" },
  { id: "clementine", name: "Clementine Vulgate", language: "Latin", languageFlag: "🏛️" },
];

const TRANSLATION_KEY = "bible-translation";

export function useTranslation() {
  const [translationId, setTranslationId] = useState(() => {
    try {
      return localStorage.getItem(TRANSLATION_KEY) || "web";
    } catch {
      return "web";
    }
  });

  useEffect(() => {
    localStorage.setItem(TRANSLATION_KEY, translationId);
  }, [translationId]);

  const currentTranslation = TRANSLATIONS.find((t) => t.id === translationId) || TRANSLATIONS[0];

  return { translationId, setTranslationId, currentTranslation, translations: TRANSLATIONS };
}
