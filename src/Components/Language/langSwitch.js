// src/LanguageSwitch.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../Layout/LayoutContext/LanguageContext';

const LanguageSwitch = () => {
  const { lang } = useParams();
  const { changeLanguage } = useLanguage();

  React.useEffect(() => {
    if (lang) {
      changeLanguage(lang);
    } else {
      changeLanguage('enlish');
    }
  }, [lang, changeLanguage]);

  return null;
};

export default LanguageSwitch;
