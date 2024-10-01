// useTranslate.js
import { useLanguage } from "../Layout/LayoutContext/LanguageContext";
import { languages } from "./language";

export const useTranslate = (key) => {
  const { language } = useLanguage();
  return languages[language]?.[key] || key;
};
