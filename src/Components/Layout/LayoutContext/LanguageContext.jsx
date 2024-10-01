import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const lang = localStorage.getItem('lang')
  const [language, setLanguage] = useState(lang ? lang :"english");



 useEffect(() => {
  //   // Set the document direction and language
  const selectedlang= language === "arabic" ? "rtl" : "ltr";
  // const styleLinkbootsrap = document.getElementById("app-style-bootstrap");
  
  //   if (styleLinkbootsrap) {
  //     styleLinkbootsrap.href = selectedlang === "rtl" ? "/assets/css/bootstrap-rtl.css" : "/assets/css/bootstrap-rtl.css";
  //   }
    const styleLinkmain = document.getElementById("app-style-main");
  
    if (styleLinkmain) {
      styleLinkmain.href = selectedlang === "rtl" ? "./assets/css/style-rtl.css" : "./assets/css/style-ltr.css";
    }
    document.documentElement.dir = language === "arabic" ? "rtl" : "ltr";
    document.documentElement.lang = language === "english" ? "en" : "ar";
  }, [language]); 

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
